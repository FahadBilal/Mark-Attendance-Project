import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Attendance } from "../models/attendance.model.js";
import { LeaveRequest } from "../models/leaveRequest.model.js";
import { Grade } from "../models/grade.model.js";

const adminDashboard = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, {}, "Welcome to the admin Dashboard"));
});

const getAllUsers = asyncHandler(async (_, res) => {
  const users = await User.find({ role: "student" }).select("-password -refreshToken");

  if (!users) {
    throw new ApiError(500, "Error when fetching all users");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Fetched All users successfully"));
});

const getAllAttendances = asyncHandler(async (_, res) => {
  const attendanceRecord = await Attendance.find().populate(
    "userId",
    "fullName email"
  ).sort({ date: -1 });

  //console.log(attendanceRecord)

  if (!attendanceRecord) {
    throw new ApiError(500, "Error fetching all attendance record");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { attendanceRecord }, "All Attendance Record Fetched Successfully")
    );
});

const createAttendanceRecord = asyncHandler(async (req, res) => {
  const { userId, date, status } = req.body;

  if([userId, date, status].some((field)=>field === "")){
    throw new ApiError(400,"All fields are required");
  }

  const existingAttendance = await Attendance.findOne({userId,date});

  if(existingAttendance){
    throw new ApiError(400,"Attendance already Marked")
  }

  const attendanceRecord = await Attendance.create({
    userId,
    date,
    status,
  });

  if (!attendanceRecord) {
    throw new ApiError(500, "Error when creating attendance record");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, attendanceRecord, "Attendance  created successfully")
    );
});

const updateAttendanceRecord = asyncHandler(async (req, res) => {
  const { attendanceId } = req.params;
  const { status } = req.body;

  const updateRecord = await Attendance.findByIdAndUpdate(
    attendanceId,
    { status },
    { new: true }
  );

  if (!updateRecord) {
    throw new ApiError(500, "Error when updated the attendance ");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updateRecord, "Attendance  update successfully")
    );
});

const deleteAttendanceRecord = asyncHandler(async (req, res) => {
  const { attendanceId } = req.params;

  const deleteRecord = await Attendance.findByIdAndDelete(attendanceId);

  if (!deleteRecord) {
    throw new ApiError(500, "Error when deleting a attendance ");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Attendance  deleted Successfully"));
});

const getAllLeaveRequest = asyncHandler(async (_, res) => {
  const leaveRequest = await LeaveRequest.find().populate(
    "userId",
    "fullName email"
  ).sort({ leaveDate: -1 });

  if (!leaveRequest) {
    throw new ApiError(500, "Error when fetching all leave request");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        leaveRequest,
        "Fetched all leave request successfully"
      )
    );
});

const updateLeaveRequest = asyncHandler(async (req, res) => {
  const { leaveRequestId } = req.params;
  const { status } = req.body;

  const updateRecord = await LeaveRequest.findByIdAndUpdate(
    leaveRequestId,
    { status },
    { new: true }
  );

  if (!updateRecord) {
    throw new ApiError(500, "Error when updated the Leave Request");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updateRecord, "Leave request update successfully")
    );
});

const generateGradeOnAttendanceRecord = asyncHandler(async (_, res) => {
  const attendanceData = await Attendance.aggregate([
    {
      $group: {
        _id: "$userId",
        totalDays: { $sum: 1 },
        presentDays: {
          $sum: {
            $cond: [{ $eq: ["$status", "present"] }, 1, 0],
          },
        },
      },
    },
  ]);

  if (!attendanceData || attendanceData.length === 0) {
    throw new ApiError(500, "Error when generating the attendance report");
  }

  //console.log(attendanceData)
  const gradeResults = [];

  for (const record of attendanceData) {
    if (record.presentDays == null || record.totalDays === 0) {
      console.warn("Invalid attendance data; skipping record.");
      continue;
    }

    const attendancePercentage = (record.presentDays / record.totalDays) * 100;

    let grade;
    if (attendancePercentage >= 90) {
      grade = "A";
    } else if (attendancePercentage >= 80) {
      grade = "B";
    } else if (attendancePercentage >= 70) {
      grade = "C";
    } else if (attendancePercentage >= 60) {
      grade = "D";
    } else {
      grade = "F";
    }

    const newGrade = await Grade.create({
      userId: record._id,
      attendancePercentage,
      grade,
      description: `Grade based on attendance percentage of ${attendancePercentage.toFixed(
        2
      )}%`,
    });

    gradeResults.push(newGrade);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, gradeResults, "Grades generated successfully"));
});

const getAllGrades = asyncHandler(async (req, res) => {
  const gradeReport = await Grade.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
    {
      $project: {
        _id: 1,
        userId: "$userDetails._id",
        fullName: "$userDetails.fullName",
        email: "$userDetails.email",
        attendancePercentage: 1,
        grade: 1,
        description: 1,
      },
    },
  ]);

  if (!gradeReport) {
    throw new ApiError(500, "Error when generating the Grade Report");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, gradeReport, "Grade report retrived successfully")
    );
});

export {
  adminDashboard,
  getAllUsers,
  getAllAttendances,
  createAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
  getAllLeaveRequest,
  updateLeaveRequest,
  generateGradeOnAttendanceRecord,
  getAllGrades,
};
