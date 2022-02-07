"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../utils/secrets");
const goggleLoginUsers = (req, res, next) => {
    const userData = req.user; //from passport ask???
    //creates a token when the user login, receives three parameters: userData and if the userData contains a password destructure and omit the password
    const token = jsonwebtoken_1.default.sign({ userData }, secrets_1.JWT_SECRET, { expiresIn: "1hr" });
    console.log("userdata", userData); //ask???
    res.json({ token: token, user: userData });
};
exports.default = goggleLoginUsers;
//# sourceMappingURL=googleLoginController.js.map