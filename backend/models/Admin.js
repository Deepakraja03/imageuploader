const mongoose = require('mongoose');

const AdminDetailSchema = new mongoose.Schema({

    username: {
        type: String,
    },
    password: {
        type: String,
    }

});

const Auth = mongoose.model("Auth", AdminDetailSchema);
module.exports = {Auth};