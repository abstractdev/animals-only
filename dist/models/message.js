"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const MessageSchema = new Schema({
    title: { type: String, required: true, maxLength: 50 },
    message: { type: String, required: true, maxLength: 256 },
    user: { type: String, ref: "User", required: true },
}, { timestamps: true });
//Export model
module.exports = mongoose_1.default.model("Message", MessageSchema);
