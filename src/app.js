require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    // validation of data
    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // create instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("new user created!!!");
  } catch (err) {
    res.status(400).send("Error : " + err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) throw new Error("Invalid credentials!");

    const user = await User.findOne({ emailId });

    if (!user) throw new Error("Invalid credentials!");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials!");

    const token = await jwt.sign({ _id: user._id }, "secret", {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 12 * 3600000),
    });
    res.send("Login Successful..!!!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/sendConnection", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).send("something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("database connected successfully...!!!");
    app.listen(8080, () => {
      console.log("server is running on port: 8080");
    });
  })
  .catch((err) => {
    console.log("database cannot be connected", err);
  });
