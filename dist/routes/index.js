"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController = require("../controllers/userController");
const statusController = require("../controllers/statusController");
const messageController = require("../controllers/messageController");
const homeController = require("../controllers/homeController");
/* GET index. */
router.get("/", homeController.homeGet);
/* GET sign-up. */
router.get("/sign-up", userController.userCreateGet);
/* POST sign-up. */
router.post("/sign-up", userController.userCreatePost);
/* GET user-page. */
router.get("/user/:username", function (req, res) {
    res.render("user");
});
/* GET status. */
router.get("/user/:username/status/guest", statusController.statusCreateGet);
router.get("/user/:username/status/member", statusController.statusCreateGet);
/* POST status. */
router.post("/user/:username/status/guest", statusController.statusGuestPost);
router.post("/user/:username/status/member", statusController.statusMemberPost);
//GET log-in
router.get("/log-in", userController.userLoginGet);
//POST log-in
router.post("/log-in", userController.userLoginPost);
//POST log-out
router.post("/log-out", userController.userLogoutPost);
//GET new-message
router.get("/user/:username/new-message", messageController.messageCreateGet);
//POST new-message
router.post("/user/:username/new-message", messageController.messageCreatePost);
//GET delete-message
router.get("/message/delete/:id", messageController.messageDeleteGet);
//POST delete-message
router.post("/message/delete/:id", messageController.messageDeletePost);
exports.default = router;
