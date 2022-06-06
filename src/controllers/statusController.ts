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
exports.statusCreatePost = [
  // Validate and sanitize fields.
  body("secret").trim().escape(),
  check("secret")
    .isIn(["yes", "Yes", "YES"])
    .withMessage("Only animals are permitted as members."),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.render("status", {
        errors: errors.array(),
        post: true,
      });
      return;
    } else {
      // Secret is correct. Update user status
      const updateUser = (async () => {
        const filter = { username: req.params.user };
        const update = { status: "member" };

        // `doc` is the document _before_ `update` was applied
        let doc = await User.findOneAndUpdate(filter, update);

        //successful - redirect to new user record.
        console.log("success");
        res.redirect("/");
      })();
    }
  },
];
