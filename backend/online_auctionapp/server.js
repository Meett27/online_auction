const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = 5000;


// import the model you created
const userInstance = require('./models/userModel');

app.use('/',(req,res)=>{
  res.sendFile(__dirname+'/Frontend/templates/signup.html')
})


app.post('/login',(req, res) => { 
    const user = userInstance.findOne({email: req.body.email})
    console.log(user);
    if(user){
        if(req.body.password === user.password){
            res.status(200).send({
                message: "Login Successful",
                email: user.email,
              });
        } else{
            return res.status(400).send({
                message: "Passwords does not match",
              });
        }
    } else{
        res.status(404).send({
            message: "email not found",
            email: user.email,
          });
    }
       
});

//register endpoint
app.post("/signup",(req, res) => { 
    
    // console.log(req.body)
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
});




app.listen(port, () => { 
    console.log(`Server listening on port ${port}`);
});         