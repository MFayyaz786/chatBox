const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const swaggerDocs = require("./utils/swagger");

const { addAnId } = require("./utils/userSocketId");
const { default: axios } = require("axios");
const { promise } = require("zod");
const server = http.createServer(app);
const io = socketio(server);
app.set("socket", io);
require("./db/index");
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Route called: ${req.originalUrl}`);
  next();
});

/**
 * @openapi
 *  '/abc':
 *    get:
 *      summary: Example endpoint
 *      responses:
 *        200:
 *          description: Successful response
 */

app.get("/", (req, res) => {
  res.send({ msg: "Welcome to chatbox" });
});
// io.on("connection", (socket) => {
//   console.log("connnection on");
//   addAnId(345, socket.id, "fiaz");
//   socket.on("data", (data) => {
//     console.log(data);
//   });
//   console.log(socket.id);
//   socket.on("disconnect", () => {
//     console.log("disconnected");
//   });
// });
const port = process.env.PORT;
swaggerDocs(app, port);
/**
 * @openapi
 * path:
 *  '/api/v1/user':
 *    get:
 *      summary: Example endpoint
 *      responses:
 *        200:
 *          description: Successful response
 */
app.use("/api/v1/user", userRouter);
server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
