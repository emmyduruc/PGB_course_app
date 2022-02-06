import mongoose, { Document } from "mongoose";

export type lessonDocument = Document & {
  desc: string;
  title: string;
  lesson: string;
};

const lessonSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<lessonDocument>("Lessons", lessonSchema);
