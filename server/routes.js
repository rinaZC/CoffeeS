const express = require("express");
//importing from models
const User = require("./modles").User;
const CoffeeProfile = require("./modles").CoffeeProfile;
const mongodb = require("mongodb");
var CryptoJS = require("crypto-js");

module.exports = (passport) => {
    const router = express.Router();
    router.post("/register", (req, res) => {
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PARSE_PHRASE)
        });
        newUser.save().then(

            resp => {
                console.log("user saved!")
                res.send(resp);
            }
        ).catch(
            err => {
                console.log(err);
                res.send(err);
            }
        )
    });

    //for log in
    const LocalStrategy = require("passport-local").Strategy;
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({
                username: username
            }, (err, user) => {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                if (!user) {
                    console.log("no user");
                    return done(null, false, { message: "no user!" });
                }
                if (password !== CryptoJS.AES.decrypt(user.password, process.env.PARSE_PHRASE).toString(CryptoJS.enc.Utf8)) {
                    console.log("wrong password");
                    return done(null, false, { message: "wrong password!" });
                }
                return done(null, user);

            })

        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    router.post("/login", passport.authenticate("local"), function (req, res) {
        res.send(req.user);
    });

    router.get("/logout", (req, res) => {
        req.logout();
        res.send("logout")
    })

    router.post("/createCoffeeProfile", (req, res) => {
        let newProfile = new CoffeeProfile({
            owner: req.body.userID,
            coffeeShops: req.body.coffeeshops,
            blackMilk: req.body.blackMilk,
            sugar: req.body.sugar,
            stayTogo: req.body.stayTogo,
            coffeeBeans: req.body.bean,
            acidity: req.body.acidity,
            body: req.body.body,
            aroma: req.body.aroma,
            favDrink: req.body.favDrink
        });
        newProfile.save().then(resp => {
            console.log(resp);
            res.send(resp);
        }).catch(err => {
            console.log(err);
            res.send(err);
        })
    })

    return router;
}