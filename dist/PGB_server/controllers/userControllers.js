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
exports.followUser = exports.deleteUser = exports.findUserById = exports.findAllUser = exports.adminCheck = exports.updateUser = exports.login = exports.register = void 0;
const errorHandlers_1 = require("../helpers/errorHandlers");
const userModel_1 = __importDefault(require("../models/userModel"));
const userServices_1 = __importDefault(require("../services/userServices"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//POST/creates Users
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, password, username } = req.body;
        if (!(email && password && firstname && lastname && username)) {
            res.status(400).send("All input is required");
        }
        const oldUser = yield userModel_1.default.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield userModel_1.default.create({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password: encryptedPassword,
            username,
        });
        const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
        });
        // save user token
        user.token = token;
        res.status(201).json(user);
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
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = yield userModel_1.default.findOne({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            // Create token
            const userToken = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
            user.token = userToken;
            return res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
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