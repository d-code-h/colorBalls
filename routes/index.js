const express   =   require('express'),
    passport    =   require("passport"),
    router      =   express.Router();

// ROUTES
// index
router.get("/", (req, res) => {
  res.redirect("/login");
});

// login
router.get("/login", (req, res) => {
  res.render("login");
})

// login logic
router.post("/login", passport.authenticate("local", 
  {
    // successRedirect: "/game",
    failureRedirect: "/login",
    failureFlash: true
  }), (req, res, next) => {
    // issue a remember me cookie if the option was checked
    if (!req.body.remember_me) { 
      req.session.cookie.expires=false;
    next(); 
    }else {
        req.session.cookie.originalMaxAge = 604800000; 
        next();
    }
  },
  function(req, res) {
  res.redirect('/game');
  }
);

// register
router.get("/register", (req, res) => {
  res.render("register");
});

// register logic
router.post("/register", (req, res) => {
  if (req.body.password == req.body.confPassword){
      User.register(new User({username: req.body.username}), req.body.password, (err, createdUser) => {
          if (err){
              req.flash("error", "Something went wrong");
              res.redirect("/register");
          }else {
              passport.authenticate("local")(req, res, () => {
                  req.flash("success", "Registration was successful, Enjoy your stay");
                  res.redirect("/game");
              });
          }
      });
  }else {
      req.flash("error", "Your passwords do not correlate");
      res.redirect("back");
  }
});

// log out
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You logged out");
  res.redirect("/login");
});

// game
router.get("/game", isLoggedIn, (req, res) => {
  res.render("index", {user: req.user});
})

// isLoggedIn
function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
      return next();
  }
  req.flash("error", "Please log in");
  res.redirect("/login");
}

module.exports = router;
