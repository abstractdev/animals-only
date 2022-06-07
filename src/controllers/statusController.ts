import { body, check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
const User = require("../models/user");

// status GET
exports.statusCreateGet = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.render("status", { post: false });
};

//status POST
exports.statusGuestPost = [
  // Validate and sanitize fields.
  body("secret")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Answer cannot be empty")
    .isLength({ max: 3 })
    .withMessage("Answer must not exceed 3 characters"),
  check("secret")
    .isIn(["yes", "Yes", "YES"])
    .withMessage("Only animals are permitted as members."),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("status", {
        errors: errors.array(),
        post: true,
      });
      return;
    } else {
      // Secret is correct. Update user status
      const updateUser = (async () => {
        const filter = { username: req.params.username };
        const update = { status: "member" };

        // `doc` is the document _before_ `update` was applied
        let doc = await User.findOneAndUpdate(filter, update);

        //successful - redirect home.
        res.redirect("/");
      })();
    }
  },
];

exports.statusMemberPost = [
  // Validate and sanitize fields.
  body("admin-password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password cannot be empty")
    .isLength({ max: 11 })
    .withMessage("Password must not exceed 11 characters"),
  check("admin-password").isIn(["abstractdev"]).withMessage("Incorrect"),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("status", {
        errors: errors.array(),
        post: true,
      });
      return;
    } else {
      // Admin password is correct. Update user status
      const updateUser = (async () => {
        const filter = { username: req.params.username };
        const update = { status: "admin" };

        // `doc` is the document _before_ `update` was applied
        let doc = await User.findOneAndUpdate(filter, update);

        //successful - redirect to new user record.
        res.redirect(`/user/${req.params.username}/status/member`);
      })();
    }
  },
];
