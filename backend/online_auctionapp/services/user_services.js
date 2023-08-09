const UserModel = require('../models/userModel')


exports.getAllUsers = async () => {
  return await UserModel.find();
};

exports.createUser = async (user) => {
  return await UserModel.create(user);
};
exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};

// exports.updateBlog = async (id, blog) => {
//   return await UserModel.findByIdAndUpdate(id, blog);
// };

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};
