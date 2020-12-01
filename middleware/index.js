var Recipe = require('../models/recipe')
//var Comment = require('../models/comment')

// all the middleare goes here
var middlewareObj = {}



middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.session.redirectTo = req.originalUrl;
  req.flash('error', 'You need to be logged in!')
  res.redirect('/login')
}

module.exports = middlewareObj
