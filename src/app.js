const express = require("express")
const app = express()
const userRouter = require("../routes/users")
app.use(express.json()); // Needed for POST and PUT
app.use(express.urlencoded({ extended: true })); // Parses data and adds to req body

app.use("/users", userRouter);
module.exports = app;