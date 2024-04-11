import express from "express";
import { login, register } from "../controllers/auth";
import upload from "../middleware/upload";

const router = express.Router();

router.route("/register").post(upload.single("file"), register);
router.route("/login").post(login);

export default router;
