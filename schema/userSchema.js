const { object, number, string } = require("zod");

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
// components: schemas: User: type: object;
// properties: email: type: string;
// contact: type: string;
// required: -email;

const payload = {
  body: object({
    email: string({
      required_error: "email is required",
    }),
    contact: string({
      required_error: "contact is required",
    }),
  }),
};
const params = {
  params: object({
    userId: string({
      required_error: "userId is required",
    }),
  }),
};
let createUserSchema = object({
  ...payload,
});

let updateUserSchema = object({
  ...payload,
});

let deleteUserSchema = object({
  ...params,
});

let getUserSchema = object({
  ...params,
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
  getUserSchema,
};
