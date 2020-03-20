const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
module.exports.sigup = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json(err);
    }
    const body = {
      email: req.body.email,
      password: hash
    };
    User.add(body)
      .then(result => {
        res.status(200).json({
          message: "SignUp successfull",
          result
        });
      })
      .catch(error => {
        res.status(500).json({
          error
        });
      });
  });
};
module.exports.login = (req, res) => {
  User.checkEmail(req.body.email)
    .then(result => {
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, same) => {
          if (same) {
            const token = jwt.sign(
              {
                id: result[0].id,
                email: result[0].email
              },
              process.env.JWT_KEY,
              {
                expiresIn: "7d"
              }
            );
            return res.status(200).json({
              message: "Auth successfull",
              err: null,
              token: token
            });
          }

          if (err) {
            return res.status(500).json({
              error: err
            });
          }

          return res.status(401).json({
            message: "Password incorrect",
            err: "password"
          });
        });
      } else {
        return res.status(401).json({
          message: "Email incorrect",
          err: "email"
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
};
