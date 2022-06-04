import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 50 },
  body: { type: String, required: true, maxLength: 256 },
  postedOn: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
