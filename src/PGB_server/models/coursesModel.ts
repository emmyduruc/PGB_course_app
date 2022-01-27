import mongoose, { Document } from "mongoose";

export type CourseDocument = Document & {
  desc: string;
  img: string;
  videos: string;
  lessons: [];
};

const CourseSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<CourseDocument>("Courses", CourseSchema);
