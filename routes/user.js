const express = require('express');
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = params => {
    const { db, userController } = params;

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/login", function (req, response, next) {
    const message = "";
    return response.render('layout', { pageTitle: 'Login', template: 'login', message });
});

router.post("/login", async (req, response, next) => {
  const user = await userController.getUser(req.body.email);
  if (user) {
    const password_valid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (password_valid) {
      token = jwt.sign(
        { id: user.userId, email: user.email, first_name: user.first_name },
        process.env.SECRET
      );
      req.session.token = token;
      req.session.user_id = user.userId;
      req.session.first_name = user.first_name;
      const message = "Login Successfull";
      console.log(message);
      return response.redirect("/client");
//      response.status(200).json({ token: token });
    } else {
      const message = "Password Incorrect";
      console.log(message);
      return response.render('layout', { pageTitle: 'Login', template: 'login', message });
//    response.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    const message = "User does not exist";
    return response.render('layout', { pageTitle: 'Login', template: 'login', message });
//  response.status(404).json({ error: "User does not exist" });
  }
});

router.get("/signup", function (req, response, next) {
    const message = "";
    return response.render('layout', { pageTitle: 'Sign Up', template: 'signup', message });
});

router.post("/signup", async (req, response, next) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        // Store hash in your password DB.
        var usr = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hash,
        };
        created_user = userController.create(usr);        
        const message = `New user ${usr.email} created`;
        console.log(message);
        return response.render('layout', { pageTitle: 'Log in', template: 'login', message });
    });
});

});

router.get("/me", async (req, res, next) => {
    try {
      let token = req.headers["authorization"].split(" ")[1];
      let decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Couldnt Authenticate" });
    }
  },
  async (req, res, next) => {
    let user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ["password"] },
    });
    if (user === null) {
      res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  }
); 

   return router;
};
  