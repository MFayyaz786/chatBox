const { object, number, string } = require("zod");

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *        - email
 *        - contact
 *       properties:
 *         email:
 *           type: string,
 *           default: ali@gmail.com
 *         contact:
 *           type: string,
 *           default: 03038998789
 *     CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        contact:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
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
