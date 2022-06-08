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
const Message = require("../models/message");
//message create GET
exports.messageCreateGet = function (req, res, next) {
    res.render("new-message", { post: false });
};
//message create POST
exports.messageCreatePost = [
    // Validate and sanitize fields.
    (0, express_validator_1.body)("title")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Title cannot be empty")
        .isLength({ max: 50 })
        .withMessage("Title cannot exceed 50 characters"),
    (0, express_validator_1.body)("message")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Message cannot be empty")
        .isLength({ max: 256 })
        .withMessage("Message cannot exceed 256 characters"),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = (0, express_validator_1.validationResult)(req);
        // Create a message object with trimmed data.
        const message = new Message({
            title: req.body.title,
            message: req.body.message,
            user: req.params.username,
        });
        if (!errors.isEmpty()) {
            res.render("new-message", {
                message: message,
                errors: errors.array(),
                post: true,
            });
            return;
        }
        else {
            // Data from form is valid. Save message.
            message.save(function (err) {
                if (err) {
                    return next(err);
                }
                //successful - redirect to new message record.
                res.redirect("/");
            });
        }
    },
];
//message delete GET
exports.messageDeleteGet = function (req, res, next) {
    res.render("delete-message", { post: false });
};
//message delete POST
exports.messageDeletePost = function (req, res) {
    const deleteMsg = (() => __awaiter(this, void 0, void 0, function* () {
        yield Message.deleteOne({ _id: req.params.id });
        //successful - redirect home.
        res.redirect("/");
    }))();
};
