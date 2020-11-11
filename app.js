// Packages
const   bodyParser              =   require("body-parser"),
        express                 =   require("express"),
        app                     =   express(),
        mongoose                =   require("mongoose"),
        passport                =   require("passport"),
        LocalStrategy           =   require("passport-local"),
        passportLocalMongoose   =   require("passport-local-mongoose"),
        flash                   =   require("connect-flash");

// Configurations
// mongoose
mongoose.connect("mongodb://localhost/color_balls");
// express-session
app.use(require("express-session")({
    secret: "Color teaches love",
    resave: false,
    saveUninitialized: false
}));


// models
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

// Others
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(flash());

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware
app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



// ROUTES
// index
app.get("/", (req, res) => {
    res.redirect("/login");
});
// login
app.get("/login", (req, res) => {
    res.render("login");
})

// login logic
app.post("/login", passport.authenticate("local", {
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
});
// register
app.get("/register", (req, res) => {
    res.render("register");
});
// register logic
app.post("/register", (req, res) => {
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
app.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "You logged out");
    res.redirect("/login");
});
// game
app.get("/game", isLoggedIn, (req, res) => {
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

// Server
app.listen(3001, () => {
    console.log("Server started at localhost: 3001" );
});