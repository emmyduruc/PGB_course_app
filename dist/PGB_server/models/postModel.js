"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        require: true,
        unique: true,
    },
    img: {
        type: String,
    },
    desc: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Post", PostSchema);
//# sourceMappingURL=postModel.js.map