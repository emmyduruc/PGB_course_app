import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../helpers/errorHandlers";
import Users from "../models/userModel";
import userModel, { UserDocument } from "../models/userModel";
import userServices from "../services/userServices";

// Our register logic starts here
// try {
//   // Get user input
//   const { first_name, last_name, email, password } = req.body;

//   // Validate user input
//   if (!(email && password && first_name && last_name)) {
//     res.status(400).send("All input is required");
//   }

//   // check if user already exist
//   // Validate if user exist in our database
//   const oldUser = await User.findOne({ email });

//   if (oldUser) {
//     return res.status(409).send("User Already Exist. Please Login");
//   }

//   //Encrypt user password
//   encryptedPassword = await bcrypt.hash(password, 10);

//   // Create user in our database
//   const user = await User.create({
//     first_name,
//     last_name,
//     email: email.toLowerCase(), // sanitize: convert email to lowercase
//     password: encryptedPassword,
//   });

//   // Create token
//   const token = jwt.sign(
//     { user_id: user._id, email },
//     process.env.TOKEN_KEY,
//     {
//       expiresIn: "2h",
//     }
//   );
//   // save user token
//   user.token = token;

//   // return new user
//   res.status(201).json(user);
// } catch (err) {
//   console.log(err);
// }
// // Our register logic ends here
// });

// // ...
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
      token,
      address,
      sex,
    } = req.body;
    const user = new userModel({
      firstName,
      username,
      lastName,
      country,
      email,
      token,
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
    const { firstName, lastName, email, password } = req.body;
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
