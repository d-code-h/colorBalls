const   express                 =   require("express"),
        app                     =   express(),
        session                 =   require("express-session"),
        mongoose                =   require("mongoose"),
        MongoStore              =   require("connect-mongo")(session),
        passport                =   require("passport"),
        LocalStrategy           =   require("passport-local"),
        flash                   =   require("connect-flash"),
        createError             =   require('http-errors'),
        path                    =   require('path'),
        logger                  =   require('morgan'),
        indexRouter             =   require('./routes/index'),
        User                    =   require("./models/Users"); //index Route


// Configurations
// mongoose
var url = process.env.DB_URL
mongoose.connect(url, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// express-session
app.use(session({
    secret: "Color teaches love",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
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

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
