import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Attendance } from "../models/attendance.model.js";
import { LeaveRequest } from "../models/leaveRequest.model.js";
import sendOptMail from "../utils/nodeMailer.js";
import { EmailVerification } from "../models/emailVerification.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findOne(userId);

  const accessToken = user.generateAccessToken();

  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const optRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // console.log(email);
  const existedRequest = await EmailVerification.findOne({ email });
  // console.log(existedRequest);

  if (existedRequest) {
    await existedRequest.deleteOne();
  }

  const opt = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(opt);

  const optExpiry = Date.now() + 5 * 60 * 1000;

  // console.log(optExpiry);

  const emailVerification = await EmailVerification.create({
    email,
    opt,
    optExpiry,
  });
  // console.log(emailVerification);

  // await  emailVerification.save();

  if (!emailVerification) {
    throw new ApiError(400, "Opt does not create");
  }

  await sendOptMail(email, opt);

  res.status(201).json(new ApiResponse(200, {}, "Opt sent to Email"));
});

const verifyOpt = asyncHandler(async (req, res) => {
  const { email, opt } = req.body;

  const optRecord = await EmailVerification.findOne({ email });

  if (!optRecord || optRecord.opt !== opt) {
    throw new ApiError(400, "Invalid Email or Opt");
  }

  if(optRecord.otpExpiry < Date.now()){
    throw new ApiError(400,"Expired Opt")
  }

  optRecord.isVerified = true;
  await optRecord.save();

  res.status(200).json(new ApiResponse(200, {}, "Email Verified Sucessfully"));
});

const registerUser = asyncHandler(async (req, res) => {
  // get user detial
  // all fields requied
  // existed User
  // profile Image
  // upload on cloudinary
  // password
  // create user
  // return

  const { fullName, email, password, role } = req.body;

  //console.log(email)
  // console.log(fullName)

  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });
  //console.log(existedUser)

  if (existedUser) {
    throw new ApiError(409, "User already existed");
  }

  // console.log(req.file);

  const profileImageLocalPath = req.file?.path;
  //console.log(profileImageLocalPath);

  if (!profileImageLocalPath) {
    throw new ApiError(400, "Profile Image is missing");
  }

  const profileImage = await uploadOnCloudinary(profileImageLocalPath);
  //console.log(profileImage)

  if (!profileImage) {
    throw new ApiError(
      400,
      "Error when profile Image is uploading on cloudinadry"
    );
  }

  const adminExist = await User.findOne({ role: "admin" });

  if (adminExist && role === "admin") {
    throw new ApiError(403, "Admin already existed");
  }
  const userRole = role === "admin" ? "admin" : "student";

  // Opt email is verified

  const optRecord = await EmailVerification.findOne({
    email,
    isVerified: true,
  });

  if (!optRecord) {
    throw new ApiError(400, "Email is not verified");
  }

  await optRecord.deleteOne();

  const user = await User.create({
    fullName,
    email,
    password,
    role: userRole,
    profileImage: profileImage.url,
  });

  const createdUser = await User.findOne(user?._id).select(
    "-password -refreshToken"
  );
  const message =
    userRole === "admin"
      ? "Admin register successfuly"
      : "User register  successfully";

  return res.status(201).json(new ApiResponse(200, createdUser, message));
});

const loginUser = asyncHandler(async (req, res) => {
  // get user detail
  // check email user exist ya not
  // check the the password
  // send refresh token in cookie
  // return res

  const { email, password } = req.body;

  if (!email) {
    throw new ApiError("Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User not Exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedIn = await User.findOne(user._id).select(
    "-password -refreshToken"
  );
  const message =
    loggedIn.role === "admin"
      ? "Admin login successfully"
      : "User login successfuly";

  const options = {
    http: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedIn,
          accessToken,
          refreshToken,
        },
        message
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    {
      new: true,
    }
  );

  const options = {
    http: true,
    secure: true,
  };

  const message =
    req.user.role === "admin"
      ? "Admin Logout Successfully"
      : "User Logout Successfully";
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, message));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    (await req.cookies.refreshToken) || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unathorized Request");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh Token is used and expired");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    const options = {
      http: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Refreshed Access Token"
        )
      );
  } catch (error) {
    throw new ApiError(401, error.message || "Unauthorized Request");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  //console.log(oldPassword);

  const user = await User.findById(req.user._id);
  // console.log(user)

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  //console.log(isPasswordValid)

  if (!isPasswordValid) {
    throw new ApiError(409, "Invalid old Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const updateProfileImage = asyncHandler(async (req, res) => {
  const profileImageLocalPath = req.file?.path;
  //console.log(profileImageLocalPath);

  if (!profileImageLocalPath) {
    throw new ApiError(400, "Profile Image is missing");
  }

  const profileImage = await uploadOnCloudinary(profileImageLocalPath);
  //console.log(profileImage);

  if (!profileImage) {
    throw new ApiError(400, "Error when file is uploading on Cloudinary");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        profileImage: profileImage.url,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  res
    .status(200)
    .json(new ApiResponse(200, user, "Profile Image is update Successfully"));
});

const markAttendance = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isAttendanceMarked = await Attendance.findOne({ userId, date: today });

  if (isAttendanceMarked) {
    throw new ApiError(400, "Attendance already marked for today");
  }

  const newAttendance = await Attendance.create({
    userId,
    date: today,
    status: "present",
  });

  return res
    .status(201)
    .json(
      new ApiResponse(200, newAttendance, "Attendance Marked Successfully")
    );
});

const submitLeaveRequest = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { leaveDate, reason } = req.body;
  if (!(leaveDate || reason)) {
    throw new ApiError(400, "All fields are required");
  }

  const leaveRequest = await LeaveRequest.create({
    userId,
    leaveDate,
    reason,
  });

  if (!leaveRequest) {
    throw new ApiError(500, "Error while submit the leave request");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Leave Request Submitted Successfully"));
});

const viewAttendanceRecord = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const attendanceRecord = await Attendance.find({ userId }).sort({ date: -1 });

  if (!attendanceRecord) {
    throw new ApiError(400, "Attendace Record not find");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { attendanceRecord },
        "Attendance Record Successfully"
      )
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  updateProfileImage,
  markAttendance,
  submitLeaveRequest,
  viewAttendanceRecord,
  verifyOpt,
  optRequest,
};
