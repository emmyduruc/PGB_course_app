import mongoose, { Document } from "mongoose";

export type CourseDocument = Document & {
  desc: string;
  title: string;
  modules: [];
};

const CourseSchema = new mongoose.Schema(
  {
    img: {
      type: String,
    },
    desc: {
      type: String,
    },
    modules: {
      type: mongoose.Schema.Types.ObjectId, // Lessons property will be an array of objectId
      ref: "Modules", //referencing to Lessons/model
    },
  },
  { timestamps: true }
);

export default mongoose.model<CourseDocument>("Courses", CourseSchema);
