const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
dbURI = process.env.MONGOURI;

//Connect mongodb
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
  
  app.use(express.json());
  
  app.listen(3000, () => {
      console.log("Server started on port 3000");
  })

  const userRoutes = require("./routes/userroutes");
  app.use('/user', userRoutes);