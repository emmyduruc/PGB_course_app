// import Users from "../models/userModel";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { BadRequestError } from "../helpers/errorHandlers";
// import express, { Request, Response, NextFunction } from "express";
// export const register = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { firstName, lastName, email, password, userName } = req.body;
//     if (!(email && password && firstName && lastName && userName)) {
//       res.status(400).send("All input is required");
//     }
//     const oldUser = await Users.findOne({ email });
//     if (oldUser) {
//       return res.status(409).send("User Already Exist. Please Login");
//     }
//     const encryptedPassword = await bcrypt.hash(password, 10);
//     const user = await Users.create({
//       firstName,
//       lastName,
//       email: email.toLowerCase(), // sanitize: convert email to lowercase
//       password: encryptedPassword,
//       userName,
//     });
//     const token = jwt.sign(
//       { user_id: user._id, email },
//       process.env.TOKEN_KEY,
//       {
//         expiresIn: "2h",
//       }
//     );
//     // save user token
//     user.token = token;
//     res.status(201).json(user);
//   } catch (error) {
//     if (error instanceof Error && error.name == "ValidationError") {
//       next(new BadRequestError("Invalid Request", error));
//     } else {
//       next(error);
//     }
//   }
// };
//# sourceMappingURL=register.js.map