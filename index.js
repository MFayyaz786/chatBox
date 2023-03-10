const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const swaggerDocs = require("./utils/swagger");
//const swaggerjsdoc = require("swagger-jsdoc");
//const swaggeruiexpress = require("swagger-ui-express");
const { addAnId, deleteAnId } = require("./utils/userSocketId");
const server = http.createServer(app);
const io = socketio(server);
app.set("socket", io);
require("./db/index");
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Route called: ${req.originalUrl}`);
  next();
});
app.get("/", (req, res) => {
  res.send({ msg: "Welcome to chatbox" });
});
io.on("connection", (socket) => {
  console.log("connnection on");
  addAnId(
    socket.handshake.query.userId,
    socket.id,
    socket.handshake.query.name
  );
  //socket.emit("join", { room: "test" });
  //console.log("emitted join event");
  // socket.on("join", (data) => {
  //   console.log("received join event:", data);
  //   socket.join(data.room);
  //   console.log(`Joined room ${data.room}`);
  //   socket.to(data.room).emit("join", data.room);
  // });
  // socket.on("leave", (data) => {
  //   socket.leave(data.room);
  // });
  require("./routes/chatSocket")(socket, io);
  // socket.on("message", (message) => {
  //   console.log("Received message from client: ", message);
  // });
  // socket.on("test", (data) => {
  //   console.log("test", data);
  //   socket.emit("test", data);
  // });
  // socket.emit("message", "hello");
  // socket.emit("message", socket.id);
  // socket.on("message", (data) => {
  //   socket.emit("message", socket.id);
  //   console.log("msg", data);
  // });
  socket.on("disconnect", () => {
    console.log("disconnected");
    deleteAnId(socket.id);
  });
});

const port = process.env.PORT;
swaggerDocs(app, port);

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       version: "1.0.0",
//       title: "ChatBox APIs Document",
//       description: "Local server chatBox",
//     },
//     servers: [
//       {
//         url: `http://localhost:${port}`,
//       },
//     ],
//   },
//   apis: ["./routes/*.js"],
// };

// const swaggerSpec = swaggerjsdoc(options);
// // Swagger page
// app.use("/docs", swaggeruiexpress.serve, swaggeruiexpress.setup(swaggerSpec));
// server.js
const listener = require("./utils/listener");
//const io = require("socket.io")(server);
listener(io);
app.use("/user", userRouter);
server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
