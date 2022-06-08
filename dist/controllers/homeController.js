"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message = require("../models/message.ts");
const User = require("../models/user.ts");
// home GET
exports.homeGet = function (req, res, next) {
    const getUserData = (() => __awaiter(this, void 0, void 0, function* () {
        //get all messages
        const allMessages = yield Message.find();
        //get users of messages
        const users = allMessages.map((e) => e.user);
        const messageUsers = yield User.find().where("username").in(users).exec();
        res.render("index", {
            title: "Animals Only",
            allMessages: allMessages,
            messageUsers: messageUsers,
        });
    }))();
};
