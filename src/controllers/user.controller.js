import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const generateAccessAndRefreshToken = async(userId)=>{

  const user = await User.findOne(userId);

  const accessToken = user.generateAccessToken();

  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({validateBeforeSave:false})

  return {accessToken, refreshToken}

}

const registerUser = asyncHandler(async (req, res) => {
  // get user detial
  // all fields requied
  // existed User
  // profile Image
  // upload on cloudinary
  // password
  // create user
  // return

  const { fullName, email, password } = req.body;

  // console.log(email)
  // console.log(fullName)

  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({email});
  //console.log(existedUser)

  if (existedUser) {
    throw new ApiError(409, "User already existed");
  }

  //console.log(req.file);

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

  const user = await User.create({
    fullName,
    email,
    password,
    profileImage: profileImage.url,
  });

  const createdUser = await User.findOne(user?._id).select("-password -refreshToken");

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Register Succesfully"));
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

  const user = await User.findOne({email});

  if (!user) {
    throw new ApiError(400, "User not Exist");
  }


  const isPasswordValid = await user.isPasswordCorrect(password)

  if(!isPasswordValid){
    throw new ApiError(400,"Invalid user credentials")
  }

  const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedIn = await  User.findOne(user._id).select(
    "-password -refreshToken"
  )

  const options ={
    http:true,
    secure:true,
  }

  return res.status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
      200,
      {
        user : loggedIn, accessToken, refreshToken,
      },
      "User LoggedIn Successfully"
    )
  )

});


export {registerUser,loginUser}
