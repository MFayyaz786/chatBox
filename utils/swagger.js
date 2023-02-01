const { Express, Request, Response } = require("express");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggeruiexpress = require("swagger-ui-express");
const dotenv = require("dotenv");
const userSchema = require("../schema/userSchema");
const http = require("http");
const https = require("https");

dotenv.config();
const port = process.env.PORT;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "ChatBox APIs Document",
      description: "Local server chatBox",
    },
    // schemes: [http, https],
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "../index.js",
    /**
     * @openapi
     * components:
     *   schema:
     *     User:
     *       type: object
     *       required:
     *        - email
     *        - contact
     *       properties:
     *         email:
     *           type: string
     *         contact:
     *           type: string
     */
  ],
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
