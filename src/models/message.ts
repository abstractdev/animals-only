import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 50 },
    message: { type: String, required: true, maxLength: 256 },
    user: { type: String, ref: "User", required: true },
  },
  { timestamps: true }
);

//Export model
module.exports = mongoose.model("Message", MessageSchema);
