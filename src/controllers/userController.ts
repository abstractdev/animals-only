import { body, check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { animals } from "../data/animals";
import bcryptjs from "bcryptjs";
import passport from "passport";
const User = require("../models/user");

// User sign-up GET
exports.userCreateGet = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.render("sign-up", { animals: animals, post: false });
};

//User sign-up POST
exports.userCreatePost = [
  // Validate and sanitize fields.
  body("first")
    .trim()
    .escape()
    .isLength({ max: 20 })
    .withMessage("First Name cannot exceed 20 characters"),
  body("last")
    .trim()
    .escape()
    .isLength({ max: 20 })
    .withMessage("Last Name cannot exceed 20 characters"),
  body("email")
    .trim()
    .escape()
    .isLength({ max: 20 })
    .withMessage("E-mail cannot exceed 20 characters"),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username must not be empty")
    .isLength({ max: 10 })
    .withMessage("Username cannot exceed 10 characters")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password must not be empty")
    .isLength({ max: 20 })
    .withMessage("Password cannot exceed 20 characters")
    .escape(),
  body("animal", "You must choose an animal")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  check("password").exists(),
  check("passwordConfirmation", "Passwords do not match")
    .exists()
    .custom((value, { req }) => value === req.body.password),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    bcryptjs.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        console.log(err);
      }
      // Create a user object with escaped and trimmed data.
      const avatar = animals.filter(e => e.name === req.body.animal).map(e => e.avatar)
      const user = new User({
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        animal: req.body.animal,
        avatar: avatar[0]
      });
      if (!errors.isEmpty()) {
        console.log(errors);
        res.render("sign-up", {
          user: user,
          animals: animals,
          errors: errors.array(),
          post: true,
        });
        return;
      } else {
        // Data from form is valid. Save user.
        user.save(function (err: any) {
          if (err) {
            if (err.name === 'MongoServerError' && err.code === 11000) {
              // Duplicate username
              res.render("sign-up", {
                user: user,
                animals: animals,
                errors: errors.array(),
                err: err,
                post: true,
              });
              return;
            }
            return next(err);
          }
          //successful - redirect to new user record.
          res.redirect(user.url);
        });
      }
    });
  },
];

//User log-in GET
exports.userLoginGet = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.render("log-in", { post: false });
};

//User log-in POST
exports.userLoginPost = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Username is: " + req.body.username);
  passport.authenticate("local", {
    successRedirect: "/user/" + req.body.username,
    failureRedirect: "log-in",
  })(req, res, next);
};
