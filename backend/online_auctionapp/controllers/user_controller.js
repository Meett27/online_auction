const userService = require("../services/user_services");
const userInstance = require('../models/userModel');



exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }


};

exports.getSignUpPage = async (req, res) => {

      res.render('signup.html');

  };

exports.getLoginPage = async (req, res) => {
    res.render('login.html');

};

// exports.postLogin = async (req, res) => {

//     const user = await userService.getUserByMail(req.body.email);
//     // console.log(user);
//     if(user){
//         if(req.body.password === user.password){
//             req.session.userId = user._id;
//             req.session.isLoggedIn  = true;
//             res.status(200).send({
//                 message: "Login Successful",
//                 email: user.email,
//               });
//         } else{
//             return res.status(400).send({
//                 message: "Passwords does not match",
//               });
//         }
//     } else{
//         res.status(404).send({
//             message: "email not found",
//             email: user.email,
//           });
//     }

// };

exports.postLogin = async (req, res) => {
  try {
      const user = await userService.getUserByMail(req.body.email);

      if (!user) {
          return res.status(404).send({
              message: "Email not found",
              email: req.body.email
          });
      }

      if (req.body.password === user.password) {
          req.session.userId = user._id.toString();
          req.session.isLoggedIn = true;
          req.session.save()
          console.log(user);
          return res.status(200).send({
              message: "Login Successful",
              email: user.email
          });
      } else {
          return res.status(400).send({
              message: "Passwords do not match"
          });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send({
          message: "Server error"
      });
  }
};




exports.createUser = async (req, res) => {
//   try {
//     const user = await userService.createUser(req.body);
//     res.render({ data: user, status: "success" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }      

    console.log(req.body)
    const user = new userInstance({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
            res.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
            console.log(error);
            res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
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
