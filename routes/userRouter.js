const express = require("express");
const app = express();
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
/**
 * @swagger
 * path:
 *  /example:
 *    get:
 *      summary: Example endpoint
 *      responses:
 *        200:
 *          description: Successful response
 */
app.get("/example", (req, res) => {
  res.send("Hello, Swagger!");
});

userRouter.get(
  "/",
  expressAyncHandler(async (req, res) => {
    const result = await userServices.get();
    res.status(200).send({ data: result });
  })
);
module.exports = userRouter;
