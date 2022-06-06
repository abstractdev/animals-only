import express from "express";
import passport from "passport";

const router = express.Router();
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
router.get("/user/:username/status", statusController.statusCreateGet);
/* POST status. */
router.post("/user/:username/status", statusController.statusCreatePost);

//GET log-in
router.get("/log-in", userController.userLoginGet);
//POST log-in
router.post("/log-in", userController.userLoginPost);
//GET new-message
router.get("/user/:username/new-message", messageController.messageCreateGet);
//POST new-message
router.post("/user/:username/new-message", messageController.messageCreatePost);

export default router;
