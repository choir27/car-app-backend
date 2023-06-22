const mongoose = require("mongoose");

const ApptSchema = new mongoose.Schema({
    date: {type: String},
    time: {type: String},
    carModel: {type: String},
    carMake: {type: String},
    carYear: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    phone: {type: String},
    zipCode: {type: String},
    contact: {type: String},
    comment: {type: String},
    stayLeave: {type: String},
    service: {type: String}
});

module.exports = mongoose.model("Appt", ApptSchema);