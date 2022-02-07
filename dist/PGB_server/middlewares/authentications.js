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
exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandlers_1 = require("../helpers/errorHandlers");
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
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required");
        }
        const oldUser = yield userModel_1.default.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield userModel_1.default.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
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
            var userToken = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
                expiresIn: "2h",
            });
            user.token = userToken;
            res.status(201).json(user);
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
//# sourceMappingURL=authentications.js.map