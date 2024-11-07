import { Router } from "express";
import { upload } from "../midllewares/multer.middleware.js";
import {
  changeCurrentPassword,
  loginUser,
  logoutUser,
  markAttendance,
  refreshAccessToken,
  registerUser,
  submitLeaveRequest,
  updateProfileImage,
  viewAttendanceRecord,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../midllewares/auth.middlware.js";

const router = Router();

router.route("/").post(upload.single("profileImage"), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").patch(verifyJwt, changeCurrentPassword);

router
  .route("/update-profile-Image")
  .patch(verifyJwt, upload.single("profileImage"), updateProfileImage);

router.route("/mark-attendance").post(verifyJwt, markAttendance);

router.route("/submitLeaveRequest").post(verifyJwt, submitLeaveRequest);

router.route("/view-attendanceRecord").get(verifyJwt, viewAttendanceRecord);

export default router;
