import express from "express";
import path from "path";
import mongoose from "mongoose";
import indexRouter from "./routes/index";
import expressLayouts from "express-ejs-layouts";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//Set up mongoose connection
const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB!);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

app.listen("3001", () => {
  console.log("running on port 3001");
});
