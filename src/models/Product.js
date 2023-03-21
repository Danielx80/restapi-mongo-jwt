import { Schema, model } from "mongoose";

const prodcutSchema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    imgUrl: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", prodcutSchema);
