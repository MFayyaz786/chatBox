const { default: axios } = require("axios");
const express = require("express");
const app = express();
const expressAyncHandler = require("express-async-handler");
const userRouter = express.Router();
const userServices = require("../services/userServices");
const { addAnId } = require("../utils/userSocketId");
const cheerio = require("cheerio");
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
userRouter.get(
  "/scrap",
  expressAyncHandler(async (req, res) => {
    try {
      const data = await axios.get(
        "https://www.worldometers.info/geography/alphabetical-list-of-countries/"
      );
      console.log("status", data.status);
      // console.log(data.data);
      const html = data.data;
      const $ = cheerio.load(html);
      const table = $(".table.tabler-hove.table-condensed  tbody  tr");
      let titles = [];
      table.each(function () {
        let title = $(this).find("td").eq(1).text();
        titles.push(title);
      });
      res.status(200).send(titles);
      // table.json();
      // res.status(200).send(table);
      // table.each(function () {
      // let title = $(this).find("td").text();
      // console.log(title);
      // res.status(200).send(title);
      // });
      // for (var item of table) {
      //   let title = $(item).find("td").text();
      //   console.log(title);
      // }
      // res.status(200).send(data.data);
    } catch (error) {
      console.log(error);
    }
  })
);
module.exports = userRouter;
