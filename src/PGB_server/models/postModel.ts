import mongoose, { Document } from "mongoose";

export type PostDocument = Document & {
  desc: string;
  img: string;
  likes: [];
};

const PostSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<PostDocument>("Post", PostSchema);
