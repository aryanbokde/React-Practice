// const { Router } = require('express');
const express = require("express");
const router = express.Router();
const User = require("../modules/Users.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Rakeshisgood$Boy";

//ROUTE01 : Create a User using POST "/api/auth/createuser". No login required.
router.post("/createuser", [
    body("name", "Enter a valid name..!").isLength({ min: 3 }).trim().escape(),
    body("email", "Enter a valid email..!").isEmail().normalizeEmail(),
    body("password", "Please enter al least 5 charater").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      // Check whether the user with this email exists already.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success: false, error: "Sorry a user with this email already exists..!" });
      }

      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hashSync(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);


//ROUTE02 : Autheticate a User using POST "/api/auth/login". No login required.
router.post("/login", [
    body("email", "Enter a valid email..!").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // Check whether the user with this email exists already.
      let user = await User.findOne({ email });
      if (!user) {        
        return res.status(400).json({ success, error: "Please try to login with currect credential..!" });
      }

      const passwordcampare = await bcrypt.compare(password, user.password);
      if (!passwordcampare) {
        return res.status(400).json({ success, error: "Please try to login with currect credential..!" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      res.status(500).send("Internal server error");
    }

  }
);


//ROUTE03 : Get Loggedin User Details using POST "/api/auth/getuser". login required.
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
