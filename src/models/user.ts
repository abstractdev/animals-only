import mongoose from "mongoose";
import { animals } from "../data/animals";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first: { type: String, required: false, maxLength: 50 },
  last: { type: String, required: false, maxLength: 50 },
  username: { type: String, required: true, minlength: 1, maxLength: 10 },
  password: { type: String, required: true, minlength: 1 },
  animal: {
    name: { type: String, required: true, minlength: 1, maxLength: 20 },
    avatar: { type: String, required: true, minlength: 1, maxLength: 50 },
    enum: animals(),
  },
  status: {
    type: String,
    required: true,
    enum: ["guest", "member", "admin"],
    default: "guest",
  },
});

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  return "/user/" + this._id;
});
