const express = require("express");
const expressAyncHandler = require("express-async-handler");
const userRouter = express.Router();
const userServices = require("../services/userServices");
const { addAnId } = require("../utils/userSocketId");

userRouter.post(
  "/",
  expressAyncHandler(async (req, res) => {
    let { email, contact } = req.body;
    const user = await userServices.addUser(email, contact);
    if (user) {
      try {
        const io = app.get.get("socket");
        console.log(io);
      } catch (error) {}
      res.status(200).send({ msg: " user", data: user });
    } else {
      res.status(400).send({ msg: "user not added" });
    }
  })
);
module.exports = userRouter;
