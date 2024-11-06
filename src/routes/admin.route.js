import { Router } from "express";
import { verifyJwt } from "../midllewares/auth.middlware.js";
import { authorizeAdmin } from "../midllewares/admin.middleware.js";
import {
  createAttendanceRecord,
  getAllAttendances,
  getAllLeaveRequest,
  getAllUsers,
  updateAttendanceRecord,
  updateLeaveRequest,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/allUsers").get(verifyJwt, authorizeAdmin, getAllUsers);

router.route("/attendance").get(verifyJwt, authorizeAdmin, getAllAttendances);

router
  .route("/attendance")
  .post(verifyJwt, authorizeAdmin, createAttendanceRecord);

router
  .route("/updateAttendanceRecord")
  .patch(verifyJwt, authorizeAdmin, updateAttendanceRecord);

router
  .route("/updateAttendanceDelete")
  .delete(verifyJwt, authorizeAdmin, getAllUsers);

router
  .route("/allLeaveRequest")
  .get(verifyJwt, authorizeAdmin, getAllLeaveRequest);

router
  .route("/updateLeaveRequest")
  .get(verifyJwt, authorizeAdmin, updateLeaveRequest);

router
  .route("/generateAttendanceRecord")
  .get(verifyJwt, authorizeAdmin, getAllUsers);

export default router;
