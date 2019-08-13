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
    }
});

const CoffeeProfileSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

});

const User = mongoose.model("User", UserSchema);
const CoffeeProfile = mongoose.model("CoffeeProfile", CoffeeProfileSchema);

module.exports = {
    User: User,
    CoffeeProfile: CoffeeProfile
}