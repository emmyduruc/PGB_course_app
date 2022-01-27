import { UserDocument } from "../models/userModel";
import Users from "../models/userModel";
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from "../helpers/errorHandlers";

//POST
const createUser = async (userDocument: UserDocument) => {
  const createdUser = await userDocument.save();
  return createdUser;
};

const loginByEmail = async ({ email, password }: UserDocument) => {
  const foundUser = await Users.findOne({ email }, { password });

  if (!foundUser) {
    throw new NotFoundError(`User ${email} or ${password} not found`);
  } else {
    console.log("please create an account");
  }
  return foundUser;
};

//PUT to update
const updateUser = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await Users.findByIdAndUpdate(userId, update, {
    new: true,
  });

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`);
  }

  return foundUser;
};

//for Admin
const adminCheck = async ({ role }: UserDocument) => {
  const adminRole = await Users.findOne({ role });

  if (!adminRole) {
    throw new NotFoundError(`User is not an admin`);
  }
};

//GET
const findAllUser = async (): Promise<UserDocument[]> => {
  return Users.find();
};

//GET a user byId
const findUserById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await Users.findById(userId);

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`);
  }

  return foundUser;
};

const deleteById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await Users.findById(userId);

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`);
  }

  return foundUser;
};

//PUT User Follower fix this later:::::::::::::::::::
const followUser = async (userId: string, update: string, follow: string) => {
  const user = await Users.findById(userId);
  const currentUser = await Users.findById(update);
  if (user !== currentUser) {
    throw new InternalServerError("Internal Server Error");
  } else {
    throw new ForbiddenError("you cannot follow yourself");
  }
};

export default {
  createUser,
  loginByEmail,
  updateUser,
  deleteById,
  adminCheck,
  followUser,
  findUserById,
  findAllUser,
};
