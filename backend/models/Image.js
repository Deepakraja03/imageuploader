const mongoose = require('mongoose');

const ImageDetailSchema = new mongoose.Schema({

    profilePicture: {
        type: String,
    }

},
{
    timestamps: true
});

const Image = mongoose.model("Image", ImageDetailSchema);
module.exports = {Image};