import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Attendance } from "../models/attendance.model.js";
import { LeaveRequest } from "../models/leaveRequest.model.js";
import { Grade } from "../models/grade.model.js";

const adminDashboard = asyncHandler( async(req,res)=>{
  res.status(200)
  .json(new ApiResponse(200,{},"Welcome to the admin Dashboard"))
})

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
    "userId",
    "fullName email"
  );

  //console.log(attendanceRecord)

  if (!attendanceRecord) {
    throw new ApiError(500, "Error fetching all attendance record");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, {attendanceRecord}, "Record Fetched Successfully")
    );
});

const createAttendanceRecord = asyncHandler(async (req, res) => {
  const { userId, date, status } = req.body;

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
      new ApiResponse(
        200,
        attendanceRecord,
        "Attendance  created successfully"
      )
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
      new ApiResponse(
        200,
        updateRecord,
        "Attendance  update successfully"
      )
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
  const totalDays = 30; // Define the total number of days

  // Aggregate attendance data by user
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

  console.log(attendanceData)
  const gradeResults = [];

  for (const record of attendanceData) {

    const { presentDays } = record;

    // Check if presentDays is defined and totalDays is non-zero to prevent NaN
    if (presentDays == null || totalDays === 0) {
      console.warn("Invalid attendance data; skipping record.");
      continue;
    }

    // Calculate attendance percentage
    const attendancePercentage = (presentDays / totalDays) * 100;

    // Determine grade based on attendance percentage
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

    // Create a new grade record for the user
    const newGrade = await Grade.create({
      userId: record._id,
      attendancePercentage,
      grade,
      description: `Grade based on attendance percentage of ${attendancePercentage.toFixed(2)}%`,
    });

    gradeResults.push(newGrade);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, gradeResults, "Grades generated successfully"));
});


const getAllGrades = asyncHandler( async (req, res)=>{
  const gradeReport = await Grade.aggregate([
    {
      $lookup:{
        from:'users',
        localField:'userId',
        foreignField:'_id',
        as:'userDetails'
      }
    },
    {
      $unwind:'$userDetails'
    },
    {
      $project:{
        _id:1,
        userId:'$userDetails._id',
        fullName:'$userDetails.fullName',
        email:'$userDetails.email',
        attendancePercentage:1,
        grade:1,
        description:1,
        createdAt:1

      }
    }
  ]);

  if(!gradeReport){
    throw new ApiError(500,"Error when generating the Grade Report");
  }

  return res.status(200)
  .json(new ApiResponse(200,gradeReport,"Grade report retrived successfully"))
})

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
