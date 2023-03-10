const { Express, Request, Response } = require("express");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggeruiexpress = require("swagger-ui-express");
const dotenv = require("dotenv");
const userSchema = require("../schema/userSchema");
const http = require("http");
const https = require("https");
dotenv.config();
const port = process.env.PORT;
LOCAL = process.env.LOCAL;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "ChatBox APIs Document",
      description: "Local server chatBox",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./swaggerRoutes/*.js", "./schema/*.js"],
};
const swaggerSpec = swaggerjsdoc(options);
function swaggerDocs(app, port) {
  // Swagger page
  app.use("/docs", swaggeruiexpress.serve, swaggeruiexpress.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  //logger.info(`Docs available at http://localhost:${port}/docs`);
}
module.exports = swaggerDocs;
