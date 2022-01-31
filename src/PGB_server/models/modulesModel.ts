import mongoose, { Document } from "mongoose";

export type ModulesDocument = Document & {
  modules: [];
};

const ModulesSchema = new mongoose.Schema(
  {
    modules: {
      type: mongoose.Schema.Types.ObjectId, // Lessons property will be an array of objectId
      ref: "Lessons", //referencing to Lessons/model
    },
  },
  { timestamps: true }
);

export default mongoose.model<ModulesDocument>("Modules", ModulesSchema);
