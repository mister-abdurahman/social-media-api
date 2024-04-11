import jwt from "jsonwebtoken";
import env from "../utils/validateEnv";
import { NextFunction, Request, Response } from "express";

export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, env.jwt_secret);
    req.user = verified;
    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
