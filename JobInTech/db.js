const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/jobintech_DB');
        console.log(`Mongo db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;

/* const connectDB = async () => {
  const url = "mongodb://127.0.0.1:27017/jobintech_DB";

  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
} */
