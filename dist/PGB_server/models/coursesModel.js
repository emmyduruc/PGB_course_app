"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CourseSchema = new mongoose_1.default.Schema({
    img: {
        type: String,
    },
    desc: {
        type: String,
    },
    lessons: {
        type: Array,
        default: [],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Courses", CourseSchema);
//# sourceMappingURL=coursesModel.js.map