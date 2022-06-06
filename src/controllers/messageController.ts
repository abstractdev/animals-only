import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
const Message = require("../models/message");

//message GET
exports.messageCreateGet = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.render("new-message", { post: false });
};

//message POST
exports.messageCreatePost = [
  // Validate and sanitize fields.
  body("title")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Title cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Title cannot exceed 50 characters"),
  body("message")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Message cannot be empty")
    .isLength({ max: 256 })
    .withMessage("Message cannot exceed 256 characters"),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a message object with escaped and trimmed data.
    const message = new Message({
      title: req.body.title,
      message: req.body.message,
      user: req.params.username,
    });
    if (!errors.isEmpty()) {
      console.log(errors);
      res.render("new-message", {
        message: message,
        errors: errors.array(),
        post: true,
      });
      return;
    } else {
      // Data from form is valid. Save message.
      message.save(function (err: any) {
        if (err) {
          return next(err);
        }
        //successful - redirect to new message record.
        res.redirect("/");
      });
    }
  },
];
