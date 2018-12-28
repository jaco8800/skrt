//functions needed for pack simulation
const packSimulator = require("../modules/packsimulator.js");

module.exports.randomInt = (low, high) => {
    return Math.floor(Math.random() * (high - low) + low);
};

module.exports.removeDuplicates = (arr) => {
    const unique_array = [];
    for (let i = 0; i < arr.length; i++) {
        if (unique_array.indexOf(arr[i]) == -1) {
            unique_array.push(arr[i]);
        }
    }
    return unique_array;
};

module.exports.getRandomLine = (arr) => {
    return arr[packSimulator.randomInt(0, arr.length)];
};
