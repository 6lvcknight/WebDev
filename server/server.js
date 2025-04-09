const express = require('express');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());

const authRoutes = require('./routes/auth.js');

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
