"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUser = exports.deleteUser = exports.findUserById = exports.findAllUser = exports.adminCheck = exports.updateUser = exports.login = exports.createUser = void 0;
const errorHandlers_1 = require("../helpers/errorHandlers");
const userModel_1 = __importDefault(require("../models/userModel"));
const userServices_1 = __importDefault(require("../services/userServices"));
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
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, country, postcode, email, password, token, address, sex, } = req.body;
        const user = new userModel_1.default({
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
        const createdUser = yield userServices_1.default.createUser(user);
        res.json(createdUser);
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.createUser = createUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        res.json(yield userServices_1.default.loginByEmail(req.body));
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.login = login;
//PUT
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const userId = req.params.userId;
        const updatedUser = yield userServices_1.default.updateUser(userId, update);
        res.json(updatedUser);
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.updateUser = updateUser;
//POST
const adminCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userServices_1.default.adminCheck(req.body.role);
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.adminCheck = adminCheck;
// GET /users (gets all existing users)
const findAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield userServices_1.default.findAllUser());
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.findAllUser = findAllUser;
// GET /users/:userId //get the existing resource
const findUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield userServices_1.default.findUserById(req.params.userId));
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.findUserById = findUserById;
// DELETE /users/:userId //Delete an existing resource
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userServices_1.default.deleteById(req.params.userId);
        res.status(204).end();
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.deleteUser = deleteUser;
//PUT User Follower fix this later:::::::::::::::::::
const followUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body.userId;
        const follow = req.body.followers;
        const userId = req.params.userId;
        const updatedUser = yield userServices_1.default.followUser(userId, update, follow);
        res.json(updatedUser);
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.followUser = followUser;
//# sourceMappingURL=userControllers.js.map