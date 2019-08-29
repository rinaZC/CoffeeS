const express = require("express");
//importing from models
const User = require("./model").User;
const CoffeeProfile = require("./model").CoffeeProfile;
const Review = require('./model').Review;
const mongodb = require("mongodb");
var CryptoJS = require("crypto-js");
var multer = require('multer')
var upload = multer({ dest: 'uploads/' });
var rp = require('request-promise');


module.exports = (passport) => {
    const router = express.Router();
    router.post("/register", (req, res) => {
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PARSE_PHRASE),
            // profilePicture:
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
        let newProfile = req.body.more
            ? new CoffeeProfile({
                owner: req.body.userID,
                coffeeShops: req.body.coffeeShops,
                blackMilk: req.body.blackMilk,
                sugar: req.body.sugar,
                stayTogo: req.body.stayTogo,
                coffeeBeans: req.body.bean,
                acidity: req.body.acidity,
                body: req.body.body,
                aroma: req.body.aroma,
                favDrink: req.body.favDrink
            })
            : new CoffeeProfile({
                owner: req.body.userID,
                coffeeShops: req.body.coffeeShops,
                blackMilk: req.body.blackMilk,
                sugar: req.body.sugar,
                stayTogo: req.body.stayTogo,

            });
        newProfile.save().then(resp => {
            console.log(resp);
            User.findByIdAndUpdate(resp.owner, { coffeeProfile: resp._id }, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log("RESULT: " + result);
                    res.send(result);

                }

            });
            //res.send(resp);
        }).catch(err => {
            console.log(err);
            res.send(err);
        })
    });

    router.get("/getProfile", (req, res) => {
        if (!req.user) {
            res.send({ new: "new" });
        } else if (!req.user.coffeeProfile) {
            res.send({ new: "false" });
        } else {
            CoffeeProfile.findOne({
                owner: req.user._id
            }, (err, profile) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.send(profile);
                }
            })
        }



    });

    router.post("/updateCoffeeProfile", (req, res) => {
        let data = req.body.more
            ? {
                owner: req.user._id,
                coffeeShops: req.body.coffeeShops,
                blackMilk: req.body.blackMilk,
                sugar: req.body.sugar,
                stayTogo: req.body.stayTogo,
                coffeeBeans: req.body.bean,
                acidity: req.body.acidity,
                body: req.body.body,
                aroma: req.body.aroma,
                favDrink: req.body.favDrink
            }
            : {
                owner: req.user._id,
                coffeeShops: req.body.coffeeShops,
                blackMilk: req.body.blackMilk,
                sugar: req.body.sugar,
                stayTogo: req.body.stayTogo,

            };
        if (req.user.coffeeProfile) {
            CoffeeProfile.findOneAndUpdate({ owner: req.user._id },
                data,
                function (err, result) {
                    if (!err) {
                        res.send(result);
                    } else {
                        console.log(err);
                        res.send(err);
                    }
                })

        } else {
            let newProfile = new CoffeeProfile(data);
            newProfile.save().then(resp => {
                console.log(resp);
                User.findByIdAndUpdate(resp.owner, { coffeeProfile: resp._id }, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        //console.log("RESULT: " + result);
                        res.send(result);

                    }

                });
                //res.send(resp);
            }).catch(err => {
                console.log(err);
                res.send(err);
            })

        }

    });

    router.post("/submitReview", upload.single('img'), (req, res) => {

        User.findById(req.user.id)
            .exec((err, user) => {
                if (!err) {

                    let newReview = new Review({
                        user: user._id,
                        like: 0,
                        img: req.file.filename,
                        coffeeShop: req.body.coffeeShop,
                        order: req.body.order,
                        content: req.body.content


                    });
                    newReview.save().then(resp => {
                        console.log("review saved!", resp)
                        res.send(resp)
                    }).catch(err => {
                        console.log(err);
                        res.send(err);
                    })

                } else {
                    console.log(err);

                }
            })






    });



    router.post("/uploadProfilePicture", upload.single('photo'), (req, res) => {
        User.findByIdAndUpdate(req.user.id, { profilePicture: req.file.filename })
            .exec((err, data) => {
                if (!err) {
                    console.log(data);
                    res.json({ profilePicture: req.file.filename });
                } else {
                    console.log(err);
                }
            })

    })
    router.post("/submitQuote", (req, res) => {
        User.findByIdAndUpdate(req.user.id, { quote: req.body.quote })
            .exec((err, data) => {
                if (!err) {
                    console.log("submitQuote", data);
                    res.send(data);
                } else {
                    console.log(err);
                }
            })

    })

    router.get("/getAllReviews", (req, res) => {
        Review.find().populate("user").exec((err, data) => {
            if (!err) {
                console.log("reviews", data);
                res.send(data.reverse());
            } else {
                console.log(err);
                res.send(err);
            }
        })
    })

    router.get("/getUserReview", (req, res) => {
        Review.find({ user: req.user.id }).populate("user").exec((err, data) => {
            if (!err) {
                console.log("user's reviews", data);
                res.send(data);
            } else {
                console.log(err);
                res.send(err);
            }
        })
    })

    router.post("/likeReview", (req, res) => {
        Review.findByIdAndUpdate(req.body.id, { $inc: { like: 1 } })
            .exec((err, data) => {
                if (!err) {

                    res.send(data);
                } else {
                    console.log(err);
                }
            })

    })

    router.post("/dislikeReview", (req, res) => {
        Review.findByIdAndUpdate(req.body.id, { $inc: { like: -1 } })
            .exec((err, data) => {
                if (!err) {

                    res.send(data);
                } else {
                    console.log(err);
                }
            })

    })

    router.post("/deleteReview", (req, res) => {
        Review.findByIdAndDelete(req.body.id).exec((err, data) => {
            if (!err) {

                res.send(data);
            } else {
                console.log(err);
            }

        })
    })

    router.post("/addReviewtoList", (req, res) => {
        User.findByIdAndUpdate(req.user.id, { $addToSet: { wishlist: req.body.id } }).exec(
            (err, data) => {
                if (!err) {
                    res.send(data);
                } else {
                    console.log(err);
                    res.send(err)
                }
            }
        )
    })

    router.post("/removeReviewfromList", (req, res) => {
        User.findByIdAndUpdate(req.user.id, { $pull: { wishlist: req.body.id } }).exec(
            (err, data) => {
                if (!err) {
                    res.send(data);
                } else {
                    console.log(err);
                    res.send(err)
                }
            }
        )

    })

    router.get("/getSavedReviews", (req, res) => {
        User.findById(req.user.id).exec((err, user) => {
            if (!err) {

                let result = [];
                let count = 0;
                if (user.wishlist.length == 0) {
                    res.send({ result })
                } else {
                    user.wishlist.forEach(r => {
                        Review.findById(r).populate("user").exec((err, data) => {
                            if (!err) {
                                if (data) {
                                    result.push(data);
                                    count++;

                                } else {
                                    count++;
                                }


                                if (count == user.wishlist.length) {
                                    res.send({ result });

                                }

                            } else {
                                console.log(err);
                            }
                        })
                    });

                }



            } else {
                console.log(err)
                res.send(err);
            }
        })
    })



    router.get("/getUserInfo", (req, res) => {
        User.findById(req.user.id)
            .exec((err, user) => {
                if (!err) {
                    res.send(user);
                } else {
                    console.log(err);
                    res.send(err);
                }
            })

    })

    router.post("/getFrequentPlaces", (req, res) => {
        console.log(req.body);
        let newArr = [];
        let count = 0;
        req.body.coffeeShops.forEach((c) => {
            rp(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.latitude},${req.body.longitude}&radius=400&keyword=${c}&key=${process.env.GOOGLEMAPS_API_KEY}`
            )
                .then(resp => {

                    return JSON.parse(resp)
                })

                .then(resp => {

                    console.log(resp.results);
                    if (resp.results.length == 0) {
                        res.send({ newArr: [] });
                    } else {
                        resp.results.forEach(r => {
                            newArr.push({
                                title: r.name,
                                description: r.vicinity,
                                coordinate: {
                                    latitude: r.geometry.location.lat,
                                    longitude: r.geometry.location.lng

                                }
                            });
                            if (newArr.length === resp.results.length) {
                                count++;
                                if (count === req.body.coffeeShops.length) {
                                    console.log(newArr);
                                    res.send({ newArr })

                                }
                            }

                        })

                    }

                })
                .catch(err => {
                    console.log(err);
                    res.send(err)
                });



        });




    });

    router.get("/getRecommendedPlaces", (req, res) => {
        User.findById(req.user.id).populate("coffeeProfile").exec((err, data) => {
            if (!err) {
                console.log(data.coffeeProfile);
                coffeeProfile = data.coffeeProfile;
                if (coffeeProfile.coffeeBeans !== "dark" && coffeeProfile.stayTogo !== "stay") {
                    //recommend champion and matto
                    rp(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mattoEspresso&inputtype=textquery&fields=name,geometry/location,formatted_address&locationbias=circle:500@40.754,-73.994584&key=${process.env.GOOGLEMAPS_API_KEY}`
                    )
                        .then(resp => {
                            return JSON.parse(resp)
                        })

                        .then(resp => {
                            let result = [];

                            console.log(resp.candidates);
                            let r = resp.candidates[0];
                            result.push({
                                title: r.name,
                                description: r.formatted_address,
                                coordinate: {
                                    latitude: r.geometry.location.lat,
                                    longitude: r.geometry.location.lng

                                }

                            });
                            rp(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=ChampionCoffee&inputtype=textquery&fields=name,geometry/location,formatted_address&locationbias=circle:500@40.754,-73.994584&key=${process.env.GOOGLEMAPS_API_KEY}`
                            )
                                .then(resp => {
                                    return JSON.parse(resp)
                                })

                                .then(resp => {


                                    console.log(resp.candidates);
                                    r = resp.candidates[0];
                                    result.push({
                                        title: r.name,
                                        description: r.formatted_address,
                                        coordinate: {
                                            latitude: r.geometry.location.lat,
                                            longitude: r.geometry.location.lng

                                        }

                                    });
                                    res.send({ result });


                                })


                        })
                } else if (coffeeProfile.coffeeBeans === "dark" && coffeeProfile.stayTogo !== "stay") {
                    //recommend matto
                    rp(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=RaminiEspressoBar&inputtype=textquery&fields=name,geometry/location,formatted_address&locationbias=circle:500@40.754,-73.994584&key=${process.env.GOOGLEMAPS_API_KEY}`
                    )
                        .then(resp => {
                            return JSON.parse(resp)
                        })

                        .then(resp => {
                            let result = [];

                            console.log(resp.candidates);
                            let r = resp.candidates[0];
                            result.push({
                                title: r.name,
                                description: r.formatted_address,
                                coordinate: {
                                    latitude: r.geometry.location.lat,
                                    longitude: r.geometry.location.lng

                                }

                            });
                            rp(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=OptimisticCafe&inputtype=textquery&fields=name,geometry/location,formatted_address&locationbias=circle:500@40.754,-73.994584&key=${process.env.GOOGLEMAPS_API_KEY}`
                            )
                                .then(resp => {
                                    return JSON.parse(resp)
                                })

                                .then(resp => {


                                    console.log(resp.candidates);
                                    r = resp.candidates[0];
                                    result.push({
                                        title: r.name,
                                        description: r.formatted_address,
                                        coordinate: {
                                            latitude: r.geometry.location.lat,
                                            longitude: r.geometry.location.lng

                                        }

                                    });
                                    res.send({ result });


                                })


                        })


                } else if (coffeeProfile.stayTogo === "stay") {
                    //recommend The Bean
                    rp(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=GregorysCoffee&inputtype=textquery&fields=name,geometry/location,formatted_address&locationbias=circle:500@40.754,-73.994584&key=${process.env.GOOGLEMAPS_API_KEY}`
                    )
                        .then(resp => {
                            return JSON.parse(resp)
                        })

                        .then(resp => {
                            let result = [];

                            console.log(resp.candidates);
                            let r = resp.candidates[0];
                            result.push({
                                title: r.name,
                                description: r.formatted_address,
                                coordinate: {
                                    latitude: r.geometry.location.lat,
                                    longitude: r.geometry.location.lng

                                }

                            });
                            rp(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=CafeGrumpy&inputtype=textquery&fields=name,geometry/location,formatted_address&locationbias=circle:500@40.754,-73.994584&key=${process.env.GOOGLEMAPS_API_KEY}`
                            )
                                .then(resp => {
                                    return JSON.parse(resp)
                                })

                                .then(resp => {


                                    console.log(resp.candidates);
                                    r = resp.candidates[0];
                                    result.push({
                                        title: r.name,
                                        description: r.formatted_address,
                                        coordinate: {
                                            latitude: r.geometry.location.lat,
                                            longitude: r.geometry.location.lng

                                        }

                                    });
                                    res.send({ result });


                                })


                        })


                } else {
                    res.send({
                        result: [


                        ]
                    })
                }

            } else {
                console.log(err);
            }

        })




    });






    return router;
}