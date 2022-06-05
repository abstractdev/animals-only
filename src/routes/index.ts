import express from "express";
const User = require("../models/user");

const router = express.Router();
const userController = require("../controllers/userController");

/* GET index. */
router.get("/", function (req, res) {
  res.render("index", { title: "Animals Only" });
});
/* GET sign-up. */
router.get("/sign-up", userController.userCreateGet);
/* POST sign-up. */
router.post("/sign-up", userController.userCreatePost);
/* GET user-page. */
router.get("/users/:user", function (req, res) {
  res.render("user");
});
export default router;
