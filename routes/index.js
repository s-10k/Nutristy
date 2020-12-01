var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user"); // login and register info
var Recipe = require("../models/recipe");
//var Recipe = require("../models/final");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

// ROOT ROUTE
router.get("/", function(req, res) {
  res.render("landing");
});

// SHOW REGISTER FORM
router.get("/register", function(req, res) {
  res.render("register", { page: "register" });
});

// SIGN UP LOGIC
router.post("/register", function(req, res) {
  
  var newUser =new User({
    username: req.body.username,
    phone:req.body.phone,
    email: req.body.email,
    address:req.body.address,
    mealpref:req.body.mealpref,
    allergy:req.body.allergy,
    resetPasswordToken: req.body.resetPasswordToken,
    resetPasswordExpires: req.body.resetPasswordExpires
  });

  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    async.waterfall(
    [
      function(user) {
       
        var smtpTransport = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "4552d059f259fd",
            pass: "2279c82b99e75e"
          }
        });
        var mailOptions = {
          to: newUser.email,
          from: "noreply.nutristy@gmail.com",
          subject: "Nutristy Registration",
          text:
            "Thank you for registering to Nutristy\n\n" +
            "Here's the way to a healthy lifestyle\n"+ 
            "http://" +
            req.headers.host
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log("mail sent");
        });
      }
    ],
    function(err) {
      if (err) return next(err);
      res.redirect("/register");
    }
  );
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome, " + user.username + "!");
      res.redirect("/recipes");
    });
  });
});

// SHOW LOGIN FORM
router.get("/login", function(req, res) {
  res.render("login", { page: "login" });
});

// LOGIN LOGIC
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/recipes",
//     failureRedirect: "/login"
//   }),
//   function(req, res) {}
// );
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/recipes';
      delete req.session.redirectTo;
      res.redirect(redirectTo);
    });
  })(req, res, next);
});

// LOGOUT LOGIC
router.get("/logout", function(req, res) {
  let loggedUser = req.body._id;
  req.logout();
  req.flash("success", "See you soon!");
  res.redirect("/recipes");
});

// FORGOT PASSWORD
router.get("/forgot", function(req, res) {
  res.render("forgot");
});

router.post("/forgot", function(req, res, next) {
  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (err) {
            req.flash("error", "Something went wrong please try again.");
            return res.redirect("/forgot");
          }
          if (!user) {
            req.flash("error", "This account does not exist. Please enter the right email id!");
            return res.redirect("/forgot");
          }
          
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
       

        var smtpTransport = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "4552d059f259fd",
            pass: "2279c82b99e75e"
          }
        });
        var mailOptions = {
          to: user.email,
          from: "noreply.nutristy@gmail.com",
          subject: "Nutristy account Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://" +
            req.headers.host +
            "/reset/" +
            token +
            "\n\n" +
            "This link will be valid for 1 hour only" +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log("mail sent");
          req.flash(
            "success",
            "An e-mail has been sent to " +
              user.email +
              " with further instructions."
          );
          done(err, "done");
        });
      }
    ],
    function(err) {
      if (err) return next(err);
      res.redirect("/forgot");
    }
  );
});

router.get("/reset/:token", function(req, res) {
  User.find(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    },
    function(err, user) {
      if (err) {
        req.flash("error", "Something went wrong please try again.");
        return res.redirect("/forgot");
      }
      console.log(user.email);
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired1.");
        return res.redirect("/forgot");
      }
      res.render("reset", { token: req.params.token});
                            //user: req.user });
    }
  );
});

router.post("/reset/:token", function(req, res) {
  async.waterfall(
    [
      function(done) {
        User.find(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
          },
          function(err, user) {
            if (err) {
              req.flash("error", "Something went wrong please try again.");
              return res.redirect("/forgot");
            }
            if (!user) {
              req.flash(
            "error",
                "Password reset token is invalid or has expired."
              );
              return res.redirect("back");
            }
            if (req.body.password === req.body.confirm) {
              user.setPassword(req.body.password, function(err) {
                if (err) {
                  req.flash("error", "Something went wrong please try again.");
                  return res.redirect("/reset");
                }
                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err) {
                  if (err) {
                    req.flash(
                      "error",
                      "Something went wrong please try again."
                    );
                    return res.redirect("/reset");
                  }
                  req.logIn(user, function(err) {
                    done(err, user);
                  });
                });
              });
            } else {
              req.flash("error", "Passwords do not match.");
              return res.redirect("back");
            }
          }
        );
      },
      function(user, done) {
        
        var smtpTransport = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "4552d059f259fd",
            pass: "2279c82b99e75e"
          }
        });
        var mailOptions = {
          to: user.email,
          from: "noreply.nutristy@gmail.com",
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n"
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash("success", "Success! Your password has been changed.");
          done(err);
        });
      }
    ],
    function(err) {
      if (err) {
        req.flash("error", "Something went wrong please try again.");
        return res.redirect("/reset");
      }
      res.redirect("/recipes");
    }
  );
});

// USER PROFILES
router.get("/users/:id", function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/");
    }
    Recipe.find()
      .where("author.id")
      .equals(foundUser._id)
      .exec(function(err, recipes) {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("/");
        }
        res.render("users/show", { user: foundUser, recipes: recipes });
      });
  });
});

module.exports = router;
