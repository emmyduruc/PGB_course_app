"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication = (req, res, next) => {
    const headers = req.headers;
    const isLoggedIn = headers.is_logged_in;
    if (isLoggedIn) {
        next();
    }
    else {
        res.status(401).send(`Please Login`);
    }
};
exports.default = authentication;
// export const createUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       username,
//       country,
//       postcode,
//       email,
//       password,
//       token,
//       address,
//       sex,
//     } = req.body;
//     const user = new userModel({
//       firstName,
//       username,
//       lastName,
//       country,
//       email,
//       token,
//       password,
//       postcode,
//       address,
//       sex,
//     });
//     const createdUser = await userServices.createUser(user);
//     res.json(createdUser);
//   } catch (error) {
//     if (error instanceof Error && error.name == "ValidationError") {
//       next(new BadRequestError("Invalid Request", error));
//     } else {
//       next(error);
//     }
//   }
// };
// export const login = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;
//     res.json(await userServices.loginByEmail(req.body));
//   } catch (error) {
//     if (error instanceof Error && error.name == "ValidationError") {
//       next(new BadRequestError("Invalid Request", error));
//     } else {
//       next(error);
//     }
//   }
// };
//# sourceMappingURL=authentications.js.map