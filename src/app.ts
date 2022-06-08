import express from "express";
import path from "path";
import mongoose from "mongoose";
import indexRouter from "./routes/index";
import expressLayouts from "express-ejs-layouts";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import bcryptjs from "bcryptjs";
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
dotenv.config();

const app = express();

//Set up mongoose connection
const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB!);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

passport.use(
  new LocalStrategy((username: string, password: string, done: any) => {
    User.findOne({ username: username }, (err: any, user: any) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcryptjs.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);
passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err: any, user: any) {
    done(err, user);
  });
});

app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
