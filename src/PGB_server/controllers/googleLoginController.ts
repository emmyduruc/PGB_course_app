import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserDocument } from "../models/userModel";
import { JWT_SECRET } from "../utils/secrets";

const goggleLoginUsers = (req: Request, res: Response, next: NextFunction) => {
  const userData = req.user as UserDocument; //from passport ask???
  //creates a token when the user login, receives three parameters: userData and if the userData contains a password destructure and omit the password
  const token = jwt.sign({ userData }, JWT_SECRET, { expiresIn: "1hr" });
  console.log("userdata", userData); //ask???
  res.json({ token: token, user: userData });
};

export default goggleLoginUsers;
