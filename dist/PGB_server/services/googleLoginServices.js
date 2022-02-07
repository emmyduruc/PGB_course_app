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
const findOrCreate = (userProfile) => __awaiter(void 0, void 0, void 0, function* () {
    //eslint-disable-next-line
    const { email, name, picture, given_name, family_name } = userProfile;
    const user = yield userModel_1.default.findOne({ email: email });
    if (!user) {
        //eslint-disable-next-line
        const newUser = yield userModel_1.default.create({
            email,
            //eslint-disable-next-line
            firstname: given_name,
            //eslint-disable-next-line
            lastname: family_name,
            picture,
        });
        return newUser.save();
    }
    else {
        return user;
    }
});
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // const  email  = userEmail
    const TheUserEmail = yield userModel_1.default.find({ email: email });
    return TheUserEmail;
});
exports.default = { findOrCreate, findByEmail };
//# sourceMappingURL=googleLoginServices.js.map