import express from "express";
const router = express.Router();

/* GET index. */
router.get("/", function (req, res) {
  res.render("index", { title: "Animals Only" });
});
/* GET sign-up. */
router.get("/sign-up", function (req, res) {
  res.render("sign-up");
});
/* POST sign-up. */
router.post("/sign-up", function (req, res) {
  res.render("sign-up");
});

export default router;
