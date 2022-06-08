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
const express_validator_1 = require("express-validator");
const User = require("../models/user");
// status GET
exports.statusCreateGet = function (req, res, next) {
    res.render("status", { post: false });
};
//status POST
exports.statusGuestPost = [
    // Validate and sanitize fields.
    (0, express_validator_1.body)("secret")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Answer cannot be empty")
        .isLength({ max: 3 })
        .withMessage("Answer must not exceed 3 characters"),
    (0, express_validator_1.check)("secret")
        .isIn(["yes", "Yes", "YES"])
        .withMessage("Only animals are permitted as members."),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.render("status", {
                errors: errors.array(),
                post: true,
            });
            return;
        }
        else {
            // Secret is correct. Update user status
            const updateUser = (() => __awaiter(void 0, void 0, void 0, function* () {
                const filter = { username: req.params.username };
                const update = { status: "member" };
                // `doc` is the document _before_ `update` was applied
                let doc = yield User.findOneAndUpdate(filter, update);
                //successful - redirect home.
                res.redirect("/");
            }))();
        }
    },
];
exports.statusMemberPost = [
    // Validate and sanitize fields.
    (0, express_validator_1.body)("admin-password")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Password cannot be empty")
        .isLength({ max: 11 })
        .withMessage("Password must not exceed 11 characters"),
    (0, express_validator_1.check)("admin-password").isIn(["abstractdev"]).withMessage("Incorrect"),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.render("status", {
                errors: errors.array(),
                post: true,
            });
            return;
        }
        else {
            // Admin password is correct. Update user status
            const updateUser = (() => __awaiter(void 0, void 0, void 0, function* () {
                const filter = { username: req.params.username };
                const update = { status: "admin" };
                // `doc` is the document _before_ `update` was applied
                let doc = yield User.findOneAndUpdate(filter, update);
                //successful - redirect to new user record.
                res.redirect(`/user/${req.params.username}/status/member`);
            }))();
        }
    },
];
