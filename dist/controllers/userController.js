"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const animals_1 = require("../data/animals");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("passport"));
const User = require("../models/user");
// User sign-up GET
exports.userCreateGet = function (req, res, next) {
    res.render("sign-up", { animals: animals_1.animals, post: false });
};
//User sign-up POST
exports.userCreatePost = [
    // Validate and sanitize fields.
    (0, express_validator_1.body)("first")
        .trim()
        .isLength({ max: 20 })
        .withMessage("First Name cannot exceed 20 characters"),
    (0, express_validator_1.body)("last")
        .trim()
        .isLength({ max: 20 })
        .withMessage("Last Name cannot exceed 20 characters"),
    (0, express_validator_1.body)("email")
        .trim()
        .isLength({ max: 20 })
        .withMessage("E-mail cannot exceed 20 characters"),
    (0, express_validator_1.body)("username")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Username must not be empty")
        .isLength({ max: 20 })
        .withMessage("Username cannot exceed 10 characters"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Password must not be empty")
        .isLength({ max: 20 })
        .withMessage("Password cannot exceed 20 characters"),
    (0, express_validator_1.body)("animal", "You must choose an animal").trim().isLength({ min: 1 }),
    (0, express_validator_1.check)("password").exists(),
    (0, express_validator_1.check)("passwordConfirmation", "Passwords do not match")
        .exists()
        .custom((value, { req }) => value === req.body.password),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = (0, express_validator_1.validationResult)(req);
        bcryptjs_1.default.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
                console.log(err);
            }
            // Create a user object with trimmed data.
            const avatar = animals_1.animals
                .filter((e) => e.name === req.body.animal)
                .map((e) => e.avatar);
            const user = new User({
                first: req.body.first,
                last: req.body.last,
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword,
                animal: req.body.animal,
                avatar: avatar[0],
            });
            if (!errors.isEmpty()) {
                res.render("sign-up", {
                    user: user,
                    animals: animals_1.animals,
                    errors: errors.array(),
                    post: true,
                });
                return;
            }
            else {
                // Data from form is valid. Save user.
                user.save(function (err) {
                    if (err) {
                        if (err.name === "MongoServerError" && err.code === 11000) {
                            // Duplicate username
                            res.render("sign-up", {
                                user: user,
                                animals: animals_1.animals,
                                errors: errors.array(),
                                err: err,
                                post: true,
                            });
                            return;
                        }
                        return next(err);
                    }
                    //successful - redirect to new user record.
                    req.logIn(user, (err) => {
                        if (err) {
                            return next(err);
                        }
                        return res.redirect("/");
                    });
                });
            }
        });
    },
];
//User log-in GET
exports.userLoginGet = function (req, res, next) {
    res.render("log-in", { post: false });
};
//User log-in POST
exports.userLoginPost = function (req, res, next) {
    passport_1.default.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "log-in",
    })(req, res, next);
};
//User log-out POST
exports.userLogoutPost = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
