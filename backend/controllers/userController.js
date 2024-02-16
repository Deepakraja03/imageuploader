const { Image } = require("../models/Image");

module.exports.test = (req,res)=>{
    res.json({
        message:"Backend is working"
    })
};

module.exports.uploadImage = async(req,res) => {
    try {
        const { imageURL, ...otherFormData } = req.body;

        // Store URL in MongoDB
        const image = new Image({ profilePicture: imageURL, ...otherFormData });
        await image.save();

        res.status(201).json({ message: "Image URL stored successfully", imageURL });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.getAllImages = async (req, res) => {
    try {
      const images = await Image.find({}, 'profilePicture');
      res.status(200).json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };