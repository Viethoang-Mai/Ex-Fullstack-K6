const express = require("express");
const cors = require("cors");
const app = express();
const webRouter = require("./routes/web");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json()); //Nhận body từ json
app.use(express.urlencoded({ extended: true })); //Nhận body từ urlencoded

// Router
app.use("/", webRouter);

module.exports = app;
