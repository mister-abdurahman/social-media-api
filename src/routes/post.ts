import express from "express";
import {
  commentPost,
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
  numOfCommentAndPost,
} from "../controllers/post";
import { verifyToken } from "../middleware/auth";
import upload from "../middleware/upload";

const router = express.Router();

router.get("/:userId", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:id", verifyToken, numOfCommentAndPost);

router.post("/", verifyToken, upload.single("file"), createPost);

router.patch("/:id/like", verifyToken, likePost);
router.post("/:id/comment", verifyToken, commentPost);

export default router;
