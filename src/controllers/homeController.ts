import { Request, Response, NextFunction } from "express";
const Message = require("../models/message.ts");
const User = require("../models/user.ts");

// home GET
exports.homeGet = function (req: Request, res: Response, next: NextFunction) {
  const getUserData = (async () => {
    //get all messages
    const allMessages = await Message.find();
    //get users of messages
    const users = allMessages.map((e: any) => e.user);
    const messageUsers = await User.find().where("username").in(users).exec();

    res.render("index", {
      title: "Animals Only",
      allMessages: allMessages,
      messageUsers: messageUsers,
    });
  })();
};
