import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import postRouter from "./routes/post";

const app = express();
// const upload = multer({ dest: "uploads/" });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// middlewares
app.use(express.json());
app.use(limiter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/uploads", express.static("uploads"));
/* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname + "-" + Math.random());
//   },
// });
// const upload = multer({ storage });

// Routers
app.get("/", (req, res) => {
  res.send("Hello Loan Application Setup");
});

// routes with file upload
// app.post("/api/auth/register", upload.single("file"), register);
// app.post("/api/post", verifyToken, upload.single("file"), createPost);

//creating universal route for routes not defined on the server
// app.use("*", (req, res) => {
//   res.status(201).json({
//     statusCode: 201,
//     message: `path not found on the server`,
//   });
// });

export default app;
