const mongoose = require('mongoose');
const dev_db_url = 'mongodb://marcap:marcap123@ds129066.mlab.com:29066/catalogoserviciostest';


const connection = () => {
  const mongoDB = process.env.MONGODB_URI || dev_db_url;
  mongoose.connect(mongoDB,{ useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};

module.exports.getConnection = connection;