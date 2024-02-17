const {Auth} = require("../models/Admin");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports.signup = async(req,res) => {
    const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new Auth({ username, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.json(error);
  }
};


module.exports.Login = async(req, res) => {
    const { username, password } = req.body;
  try {
    const validUser = await Auth.findOne({ username });
    if (!validUser) return errorHandler(404, 'User not found');
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return errorHandler(401, 'wrong credentials');
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest,token);
  } catch (error) {
    res.status(404).json("Error", error);
  }
};
