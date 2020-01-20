const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Service = new Schema({
    name: {
        type: String,
        required: true
    },
    picture: String,
    brief: {type: String,
            default: 'We offer a top quality service at an unbeatable price'}, 
    description: String
});

module.exports = mongoose.model('Service', Service);