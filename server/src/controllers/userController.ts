import { Request, Response } from "express";

import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    if(!usernameRegex.test(username)){
        return res.status(400).send({message: "Username contains invalid Characters"})
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    return res.status(201).send({ user });
  } catch (error) {
    return res.status(500).send({ messaga: "Error signing up!", error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { userId, password }:{userId: string, password: string} = req.body;
  try {
    let existingUser = undefined;
    if(userId.includes("@")){
        existingUser = await User.findOne({ email: userId });
    }else{
        existingUser = await User.findOne({ username: userId });
    }
    
    if (!existingUser) {
      return res.status(400).send({ message: "User not found" });
    }
    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordMatched) {
      return res.status(400).send({ message: "wrong Password!" });
    }

    const jwtToken = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", jwtToken, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).send({ existingUser });
  } catch (error) {
    return res.status(500).send({ messaga: "Error Log in!", error: error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({ messaga: "Logged out successfully!" });
  } catch (error) {
    return res
      .status(500)
      .send({ messaga: "Error Logging out!", error: error });
  }
};
