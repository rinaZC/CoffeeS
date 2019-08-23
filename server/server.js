const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
const passport = require("passport");
const session = require("express-session");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("uploads"));
app.use(
    session({
        secret: process.env.EXPRESS_SECRET
    })
);

app.use(passport.initialize());
app.use(passport.session());



app.use(require("./routes")(passport));

app.listen("5000", () => { console.log("listen on port 5000") });

