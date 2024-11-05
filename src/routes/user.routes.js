import { Router } from "express";
import { upload } from "../midllewares/multer.middleware.js";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { verifyJwt } from "../midllewares/auth.middlware.js";

const router = Router();

router.route("/register").post(upload.single("profileImage"), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt,logoutUser)

router.route("/refresh-token").post(refreshAccessToken)




export default router;
