import { Router } from "express";
import { upload } from "../midllewares/multer.middleware.js";
import { changeCurrentPassword, loginUser, logoutUser, refreshAccessToken, registerUser, updateProfileImage } from "../controllers/user.controller.js";
import { verifyJwt } from "../midllewares/auth.middlware.js";

const router = Router();

router.route("/register").post(upload.single("profileImage"), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt,logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").patch(verifyJwt,changeCurrentPassword)

router.route("/update-profile-Image").patch(verifyJwt,upload.single("profileImage"),updateProfileImage);




export default router;
