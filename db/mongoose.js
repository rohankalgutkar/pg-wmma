var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// const URI = 'mongodb://localhost:27017/pg-wmma';
// const URI = process.env.MONGODB_URI;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pg-wmma', { useNewUrlParser: true });

module.exports = {
  mongoose
}
