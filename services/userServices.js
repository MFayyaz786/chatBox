const userModel = require("../model/userModel");
const userServices = {
  addUser: async (email, contact) => {
    const user = new userModel({
      email,
      contact,
    });
    console.log(user);
    const result = await user.save();
    return result;
  },
  get: async () => {
    const users = await userModel.find({});
    return users;
  },
  getById: async (_id) => {
    const user = await userModel.findById({ _id });
    return user;
  },
};
module.exports = userServices;
