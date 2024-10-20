let mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
const url = process.env.MONGODB_URL;

mongoose.connect(url);

module.exports = mongoose;