"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const animals_1 = require("../data/animals");
const animalNames = animals_1.animals.map((e) => e.name);
const animalAvatars = animals_1.animals.map((e) => e.avatar);
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    first: { type: String, required: false, maxLength: 20 },
    last: { type: String, required: false, maxLength: 20 },
    email: { type: String, required: false, maxLength: 20 },
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxLength: 20,
        unique: true,
    },
    password: { type: String, required: true, minlength: 1, maxLength: 256 },
    animal: {
        type: String,
        required: true,
        minlength: 1,
        maxLength: 20,
        enum: animalNames,
    },
    avatar: { type: String, required: true, enum: animalAvatars },
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
module.exports = mongoose_1.default.model("User", UserSchema);
