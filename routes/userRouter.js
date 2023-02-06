const { default: axios } = require("axios");
const express = require("express");
const app = express();
const expressAyncHandler = require("express-async-handler");
const userRouter = express.Router();
const userServices = require("../services/userServices");
const { addAnId } = require("../utils/userSocketId");
const cheerio = require("cheerio");
const bookModel = require("../model/bookModel");
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
        "https://books.toscrape.com/catalogue/category/books/mystery_3/index.html"
      );
      console.log("status", data.status);
      const $ = cheerio.load(data.data);
      //const title = $("h1").text();
      //console.log(title);
      const bookData = [];
      const book = $("article");
      book.each(function () {
        title = $(this).find("h3 a").text();
        rate = $(this).find(".price_color").text();
        status = $(this).find(".availability").text().trim();
        bookData.push({ title, rate, status });
      });
      for (var item of bookData) {
        const books = new bookModel({
          title: item.title,
          rate: item.rate,
          status: item.status,
        });
        let result = await books.save();
      }
      // if (result) {
      // console.log(bookData);
      res.status(200).send({ msg: "Ok", data: bookData });
      // }
      //  #default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.product_price > p.instock.availability
      //  #default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.product_price > p.price_color
      // #default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article
      // const productName = $(".fpname img").attr("alt");
      // const city = $(".fpSelect p").text();
      // const allcity = $(
      //   "body > section:nth-child(7) > div > div > div > div > div > div > div.uk-visible@s.uk-grid > div:nth-child(2) > div > div > ul"
      // );
      // const label = $("label").text();
      // const rate1 = $(".uk-switcher.fpList li .fptitle").text();
      // const rate = $(".uk-active .fptitle").text();
      // console.log({ productName, city, rate, label, rate1, allcity });
      // console.log(data.data);
      // const html = data.data;
      // const $ = cheerio.load(html);
      // const table = $(".table.tabler-hove.table-condensed  tbody  tr");
      // let titles = [];
      // table.each(function () {
      //   let title = $(this).find("td").eq(1).text();
      //   titles.push(title);
      // });
      // res.status(200).send(data.data);
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
