const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    coffeeProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CoffeeProfile',
    },
    profilePicture: {
        type: String
    },
    quote: {
        type: String
    },
    wishlist: {
        type: Array
    }
});

const ReviewSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    coffeeShop: {
        type: String,

    },
    order: {
        type: String,

    },
    content: {
        type: String,

    },
    img: {
        type: String,

    },
    like: {
        type: Number,
        required: true
    },

})

const CoffeeProfileSchema = new mongoose.Schema({
    owner: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    coffeeShops: {
        type: Array

    },
    blackMilk: {
        type: String,
        enum: ["milk", "black", "both"]
    },
    sugar: {
        type: Boolean
    },
    stayTogo: {
        type: String,
        enum: ["stay", "togo", "both"]
    },
    coffeeBeans: {
        type: String,
        enum: ["light", "medium", "dark"]
    },
    acidity: {
        type: String,
        enum: ["dull", "medium", "lively"]
    },
    body: {
        type: String,
        enum: ["light", "heavy"]
    },
    aroma: {
        type: String,
        enum: ["floweryFruity", "nuttySmoky"]
    },
    favDrink: {
        type: String
    }

});

const User = mongoose.model("User", UserSchema);
const CoffeeProfile = mongoose.model("CoffeeProfile", CoffeeProfileSchema);
const Review = mongoose.model("Review", ReviewSchema);



module.exports = {
    User: User,
    CoffeeProfile: CoffeeProfile,
    Review: Review
}