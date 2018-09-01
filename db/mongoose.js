var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// const URI = 'mongodb://localhost:27017/pg-wmma';
const URI = MONGODB_URI;

mongoose.connect(URI, { useNewUrlParser: true });

module.exports = {
  mongoose
}
