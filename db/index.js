const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });
45;
// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://<username>:<password>@cluster.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient("mongodb://192.168.4.61:27017/ChatBox", {
//   useNewUrlParser: true,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
