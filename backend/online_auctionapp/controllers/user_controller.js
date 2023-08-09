const userService = require("../services/user_services");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.render({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const blog = await userService.getUserById(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.updateBlog = async (req, res) => {
//   try {
//     const blog = await blogService.updateBlog(req.params.id, req.body);
//     res.json({ data: blog, status: "success" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.deleteUser = async (req, res) => {
  try {
    const blog = await userService.deleteUser(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
