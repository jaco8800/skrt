/* eslint-disable semi */
const mongoose = require("mongoose");

const pointsSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    points: Number
})

module.exports = mongoose.model("Points", pointsSchema)
