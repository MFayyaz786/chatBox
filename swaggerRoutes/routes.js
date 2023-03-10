const { createUserScheam } = require("../schema/userSchema");
/**
 * @openapi
 * '/user/post':
 *  post:
 *     tags: [User]
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *       404:
 *         description: Data Not Found
 */

/**
 * @swagger
 * /user/getById:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     parameters:
 *          - name: userId
 *            in: query
 *            required: true
 *     responses:
 *       200:
 *         description: The list of the users
 *       404:
 *         description: Data Not Found
 */

/**
 *@swagger
 * /user/{getById}:
 *  get:
 *    summary: Returns a user based on their ID
 *    tags: [Users]
 *    parameters:
 *      - name: userId
 *        in: query
 *        required: true
 *        description: ID of the user to retrieve
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: "Users"
 *                data:
 *                  type: object
 *                  properties:
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: "Users"
 *                data:
 *                  type: object
 *                  properties:
 */
