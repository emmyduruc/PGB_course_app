import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../helpers/errorHandlers";
import Users from "../models/userModel";
import userModel, { UserDocument } from "../models/userModel";
import userServices from "../services/userServices";

//POST/creates Users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      username,
      country,
      postcode,
      email,
      password,
      address,
      sex,
    } = req.body;
    const user = new userModel({
      firstName,
      username,
      lastName,
      country,
      email,
      password,
      postcode,
      address,
      sex,
    });
    const createdUser = await userServices.createUser(user);
    res.json(createdUser);
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
    res.json(await userServices.loginByEmail(req.body));
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

//PUT
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    const updatedUser = await userServices.updateUser(userId, update);
    res.json(updatedUser);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

//POST
export const adminCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userServices.adminCheck(req.body.role);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

// GET /users (gets all existing users)
export const findAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await userServices.findAllUser());
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

// GET /users/:userId //get the existing resource
export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await userServices.findUserById(req.params.userId));
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

// DELETE /users/:userId //Delete an existing resource
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userServices.deleteById(req.params.userId);
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

//PUT User Follower fix this later:::::::::::::::::::
export const followUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body.userId;
    const follow = req.body.followers;
    const userId = req.params.userId;
    const updatedUser = await userServices.followUser(userId, update, follow);
    res.json(updatedUser);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};
