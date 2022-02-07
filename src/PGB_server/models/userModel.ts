import mongoose, { Document } from "mongoose";

export type UserDocument = Document & {
  _Id: string; //do not specify it
  username: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  desc: string;
  city: string;
  houseNumber: string;
  phoneNumber?: string;
  postcode?: string;
  address: string;
  email: string;
  sex: string;
  isAdmin: boolean;
  password: string;
  cart: string[];
  profilePic: string;
  followings: string[];
  followers: string[];
  relationship: number;
  coverPic: string;
  token: string;
  role: string;
};

const UserSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<UserDocument>("Users", UserSchema);
