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
const userModel_1 = __importDefault(require("../models/userModel"));
const errorHandlers_1 = require("../helpers/errorHandlers");
//POST
const createUser = (userDocument) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield userDocument.save();
    return createdUser;
});
const loginByEmail = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield userModel_1.default.findOne({ email }, { password });
    if (!foundUser) {
        throw new errorHandlers_1.NotFoundError(`User ${email} or ${password} not found`);
    }
    else {
        console.log("please create an account");
    }
    return foundUser;
});
//PUT to update
const updateUser = (userId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield userModel_1.default.findByIdAndUpdate(userId, update, {
        new: true,
    });
    if (!foundUser) {
        throw new errorHandlers_1.NotFoundError(`User ${userId} not found`);
    }
    return foundUser;
});
//for Admin
const adminCheck = ({ role }) => __awaiter(void 0, void 0, void 0, function* () {
    const adminRole = yield userModel_1.default.findOne({ role });
    if (!adminRole) {
        throw new errorHandlers_1.NotFoundError(`User is not an admin`);
    }
});
//GET
const findAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    return userModel_1.default.find();
});
//GET a user byId
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield userModel_1.default.findById(userId);
    if (!foundUser) {
        throw new errorHandlers_1.NotFoundError(`User ${userId} not found`);
    }
    return foundUser;
});
const deleteById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield userModel_1.default.findById(userId);
    if (!foundUser) {
        throw new errorHandlers_1.NotFoundError(`User ${userId} not found`);
    }
    return foundUser;
});
//PUT User Follower fix this later:::::::::::::::::::
const followUser = (userId, update, follow) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(userId);
    const currentUser = yield userModel_1.default.findById(update);
    if (user !== currentUser) {
        throw new errorHandlers_1.InternalServerError("Internal Server Error");
    }
    else {
        throw new errorHandlers_1.ForbiddenError("you cannot follow yourself");
    }
});
exports.default = {
    createUser,
    loginByEmail,
    updateUser,
    deleteById,
    adminCheck,
    followUser,
    findUserById,
    findAllUser,
};
//# sourceMappingURL=userServices.js.map