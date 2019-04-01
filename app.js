require("dotenv").config();

const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    cookieParser = require("cookie-parser");
    mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/museum', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(cookieParser('keyboard cat'));
app.use(require("express-session")({
    secret: "Sebastian is a furry fluffhead",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


const port = process.env.PORT || 3000;

// requiring routes
const indexRoutes = require("./routes/index");

//app.use(bodyParser.urlencoded({extended: true}));





app.use("/", indexRoutes);

app.listen(port, function(){
    console.log("Museum Server Started!");
});