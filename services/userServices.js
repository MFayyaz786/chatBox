const userModel = require("../model/userModel");
const userServices = {
  addUser: async (email, contact) => {
    const user = new userModel({
      email,
      contact,
    });
    const result = await user.save();
    return result;
  },
};
module.exports = userServices;
