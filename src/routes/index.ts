import express from "express";
import { animals } from "../data/animals";
const router = express.Router();

/* GET index. */
router.get("/", function (req, res) {
  res.render("index", { title: "Animals Only" });
});
/* GET sign-up. */
router.get("/sign-up", function (req, res) {
  res.render("sign-up", { animals: animals() });
});
/* POST sign-up. */
router.post("/sign-up", function (req, res) {
  res.render("sign-up");
});

export default router;
