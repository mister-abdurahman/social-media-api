import { Request, Response } from "express";
import Post from "../models/post";
import User from "../models/user";

/* CREATE */
export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, description } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });

    if (req.file) {
      newPost.picturePath = req.file.path;
    }

    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
// user and his followers posts
export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const user = await User.findById(req.params.userId);
    const friendsPosts = await Promise.all(
      user.friends.map((id: string) =>
        Post.find({ userId: id }).skip(skip).limit(pageSize)
      )
    );
    const userPosts = await Post.find({ userId: req.params.userId })
      .skip(skip)
      .limit(pageSize);
    res.status(200).json({ feed: [...userPosts, ...friendsPosts] });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const post = await Post.find().skip(skip).limit(pageSize);
    res.status(200).json(post);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post?.likes?.get(userId);

    if (isLiked) {
      post?.likes?.delete(userId);
    } else {
      post?.likes?.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post?.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const commentPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;
    const post = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: [...(post?.comments ?? []), { userId, comment }] },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
export const numOfCommentAndPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    res
      .status(200)
      .json({ comments: post?.comments.length, likes: post?.likes?.size });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
