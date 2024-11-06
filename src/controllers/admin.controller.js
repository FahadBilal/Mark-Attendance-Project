import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Attendance } from "../models/attendance.model.js";
import { LeaveRequest } from "../models/leaveRequest.model.js";

const getAllUsers = asyncHandler(async (_, res) => {
  const users = await User.find({ role: "student" }).select("-password");

  if (!users) {
    throw new ApiError(500, "Error when fetching all users");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Fetched All users successfully"));
});

const getAllAttendances = asyncHandler(async (_, res) => {
  const attendanceRecord = await Attendance.find().populate(
    "user",
    "fullName email"
  );

  if (!attendanceRecord) {
    throw new ApiError(500, "Error fetching all attendance record");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, attendanceRecord, "Record Fetched Successfully")
    );
});

const createAttendanceRecord = asyncHandler(async (req, res) => {
  const { userId, date, status } = req.body;

  const attendanceRecord = await Attendance.create({
    user: userId,
    date,
    status,
  });

  if (!attendanceRecord) {
    throw new ApiError(500, "Error when creating attendance record");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        attendanceRecord,
        "Attendance record created successfully"
      )
    );
});

const updateAttendanceRecord = asyncHandler(async (req, res) => {
  const { userId } = req.param;
  const { status } = req.body;

  const updateRecord = await Attendance.findByIdAndUpdate(
    userId,
    { status },
    { new: true }
  );

  if (!updateRecord) {
    throw new ApiError(500, "Error when updated the attendance record");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateRecord,
        "Attendance record update successfully"
      )
    );
});

const deleteAttendanceRecord = asyncHandler(async (req, res) => {
  const { userId } = req.param;

  const deleteRecord = await Attendance.findByIdAndDelete(userId);

  if (!deleteRecord) {
    throw new ApiError(500, "Error when deleting a attendance record");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Attendance record deleted Successfully"));
});

const getAllLeaveRequest = asyncHandler(async (_, res) => {
  const leaveRequest = await LeaveRequest.find().populate(
    "user",
    "fullName email"
  );

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
  const { userId } = req.param;
  const { status } = req.body;

  const updateRequest = await LeaveRequest.findByIdAndUpdate(
    userId,
    { status },
    { new: true }
  );

  if (!updateRequest) {
    throw new ApiError(500, "Error when updated the Leave Request");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updateRecord, "Leave request update successfully")
    );
});

const generateAttendanceRecord = asyncHandler(async (req, res) => {
  const report = await Attendance.aggregate([
    {
      $group: {
        _id: "$user",
        totalDays: { $sum: 1 },
        presentDay: {
          $sum: {
            $cond: [{ $eq: ["$status", "present"] }, 1, 0],
          },
        },
      },
    },
  ]);

  if (!report) {
    throw new ApiError(500, "Error when generating the attendance report");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, report, "Report generate successfully"));
});

export {
  getAllUsers,
  getAllAttendances,
  createAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
  getAllLeaveRequest,
  updateLeaveRequest,
  generateAttendanceRecord,
};
