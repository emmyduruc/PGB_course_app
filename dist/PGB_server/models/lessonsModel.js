"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lessonSchema = new mongoose_1.default.Schema({
    desc: {
        type: String,
    },
    title: {
        type: String,
    },
    lesson: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Lessons", lessonSchema);
//# sourceMappingURL=lessonsModel.js.map