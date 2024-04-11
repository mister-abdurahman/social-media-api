import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import env from "../utils/validateEnv";

const maxAge = 1 * 24 * 60 * 60;
const createToken = (id: string) => {
  return jwt.sign({ id }, env.jwt_secret, { expiresIn: maxAge });
};

export async function register(req: any, res: any, next: any) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    }: any = req.body;

    //    we need to send data in multipart form data to upload image

    if (!email || !password || !firstName || !lastName) {
      throw new Error("Ensure you fill all the inputs correctly");
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      location,
      occupation,
    });

    if (req.file) {
      newUser.picturePath = req.file.path;
    }

    await newUser.save();
    const token = createToken(newUser._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    delete newUser?.password;
    res
      .status(200)
      .json({ user: newUser._id, message: "User registered successfully" });
  } catch (error: any) {
    console.log(error.message);
    res.status(422).json({ status: "error", message: error.message });
    next(error);
  }
}

export async function login(req: any, res: any, next: any): Promise<any> {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    delete user.password;
    // const { password: x, ...rest } = user;
    // const newObj = Object.assign({}, rest);

    // res.status(200).json({ Email: user.email, id: user._id });
    const userToReturn = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userEmail: user.email,
      picturePath: user.picturePath,
      friends: user.friends,
    };
    res.status(200).json({ user: userToReturn, token });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  } finally {
    next();
  }
}
