"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 40,
        unique: true,
    },
    desc: {
        type: String,
    },
    city: {
        type: String,
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    },
    password: {
        type: String,
        min: 7,
        max: 15,
        unique: true,
    },
    token: {
        type: String,
    },
    profilePic: {
        type: String,
        default: "",
    },
    coverPic: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Users", UserSchema);
//# sourceMappingURL=userModel.js.map