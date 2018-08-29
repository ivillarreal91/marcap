const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ServiceSchema = new Schema({
    cat: {type: String, required: true, max: 200},
    area: {type: String, required: true, max: 200},
    item: {type: String, required: true, max: 200},
});


// Export the model
module.exports = mongoose.model('CAT_Service', ServiceSchema);