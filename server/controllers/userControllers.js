const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, EXPIRES_IN } = require("../config/index");

module.exports = {
  register: async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        code: 400,
        msg: "All fields are required"
      });

    try {
      //Check for existing user
      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({
          code: 400,
          msg: "User already exist"
        });

      //create new user
      const newUser = new User({ name, email, password });

      //salt and hash the password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) return next(err);
          newUser.password = hash;
          newUser.save().then(user => {
            //token
            jwt.sign(
              { id: user._id },
              JWT_SECRET,
              { expiresIn: EXPIRES_IN },
              (err, token) => {
                if (err) throw next(err);

                return res.status(201).json({
                  code: 201,
                  token,
                  user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                  }
                });
              }
            );
          });
        });
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        msg: "Error occurred while creating user"
      });
    }
  }
};
