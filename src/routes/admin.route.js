import { Router } from "express";
import { verifyJwt } from "../midllewares/auth.middlware.js";
import { authorizeAdmin } from "../midllewares/admin.middleware.js";
import {
  adminDashboard,
  createAttendanceRecord,
  deleteAttendanceRecord,
  generateGradeOnAttendanceRecord,
  getAllAttendances,
  getAllGrades,
  getAllLeaveRequest,
  getAllUsers,
  updateAttendanceRecord,
  updateLeaveRequest,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/").get(verifyJwt,authorizeAdmin,adminDashboard)

router.route("/allUsers").get(verifyJwt, authorizeAdmin, getAllUsers);

router.route("/attendance").get(verifyJwt, authorizeAdmin, getAllAttendances);

router
  .route("/attendance")
  .post(verifyJwt, authorizeAdmin, createAttendanceRecord);

router
  .route("/updateAttendance/:attendanceId")
  .put(verifyJwt, authorizeAdmin, updateAttendanceRecord);

router
  .route("/deleteAttendance/:attendanceId")
  .delete(verifyJwt, authorizeAdmin, deleteAttendanceRecord);

router
  .route("/allLeaveRequest")
  .get(verifyJwt, authorizeAdmin, getAllLeaveRequest);

router
  .route("/updateLeaveRequest/:leaveRequestId")
  .patch(verifyJwt, authorizeAdmin, updateLeaveRequest);

router
  .route("/generateGrade")
  .post(verifyJwt, authorizeAdmin, generateGradeOnAttendanceRecord);

router
  .route("/allGrades")
  .get(verifyJwt, authorizeAdmin, getAllGrades);

export default router;
