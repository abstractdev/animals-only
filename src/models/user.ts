import mongoose from "mongoose";
import { animals } from "../data/animals";
const animalNames = animals.map((e) => e.name);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first: { type: String, required: false, maxLength: 20 },
  last: { type: String, required: false, maxLength: 20 },
  email: { type: String, required: false, maxLength: 20 },
  username: { type: String, required: true, minlength: 1, maxLength: 10 },
  password: { type: String, required: true, minlength: 1, maxLength: 256 },
  animal: {
    type: String,
    required: false,
    minlength: 1,
    maxLength: 20,
    enum: animalNames,
  },
  status: {
    type: String,
    required: false,
    enum: ["guest", "member", "admin"],
    default: "guest",
  },
});

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  return "/user/" + this.username;
});

//Export model
module.exports = mongoose.model("User", UserSchema);
