const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        maxLength: 10,
    }
})

const Contacts = mongoose.model('Contacts', contactSchema);
module.exports = Contacts;