require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/signin");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//middlewares..
app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CANNOT BE CONNEDTED :", err));

app.listen(8000, () => console.log("listenning on port 8000"));
