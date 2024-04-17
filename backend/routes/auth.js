const express = require('express');
const router = express.Router();
const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "Gajendratatel";
// const { query } = require('express-validator');
const { body, validationResult } = require('express-validator');

// Create a User:  POST "/api/auth/createuser" no login  require
// add vlidattion useing  express validator search  google 
router.post('/createuser', [
  body('name', 'enter valid  name').isLength({ min: 5 }),
  body('email').isEmail(),
  body('password', 'pasword must be 5 character').isLength({ min: 5 })

], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check whether the user with this email exists already
  // user.findone is promise so wait for resolve s
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ errors: "Sorry user with this email alredy exits" });
    }
    const salt = await bcrypt.genSalt(10)//fuction of bcrypt gem 
    const secPass = await bcrypt.hash(req.body.password, salt)//return promise so use await
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    console.log({token: authtoken})
    res.json({"user": user, "Token": authtoken});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Some Error Occured" });
  }
  // .then(user => res.json(user))
  // .catch(err => console.log(err),
  // res.json({errors: 'please enter uniqe value for email', message: err.message}))
  // const user = User(req.body);
  // user.save()
  // console.log(req.body)
  // res.send('hello')
})

// ROUTE 2 : Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// route 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
// middlware  ek function(fetchuser) he jo call kiya jyeaga  login  route pr 
router.post("/getuser", fetchuser, async (req, res) => {//here fetchuser is middleware function
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");//select all field except password
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router



// video no 49
// npm i bcryptjs -  for install authentication useing bcrypt seracrh google
// npm i jwt-js