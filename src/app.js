require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
