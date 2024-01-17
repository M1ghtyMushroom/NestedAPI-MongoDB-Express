const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('# Connected to database!');
  } catch (err) {
    console.error('#! Error connecting to database:', err.message);
  }
};

module.exports = connect;
