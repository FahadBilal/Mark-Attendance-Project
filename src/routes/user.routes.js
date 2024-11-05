import { Router } from "express";
import { upload } from "../midllewares/multer.middleware.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(upload.single("profileImage"), registerUser);

router.route("/login").post(loginUser);




export default router;
