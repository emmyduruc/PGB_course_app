import express, { Request, Response, NextFunction } from "express";
import Users from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../helpers/errorHandlers";

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers;
  const isLoggedIn = headers.is_logged_in;
  if (isLoggedIn) {
    next();
  } else {
    res.status(401).send(`Please Login`);
  }
};

export default authentication;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await Users.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await Users.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      var userToken = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = userToken;

      res.status(201).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};
