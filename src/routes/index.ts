import express from "express";
import passport from "passport";

const router = express.Router();
const userController = require("../controllers/userController");
const statusController = require("../controllers/statusController");

/* GET index. */
router.get("/", function (req, res) {
  res.render("index", { title: "Animals Only" });
});
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

export default router;
