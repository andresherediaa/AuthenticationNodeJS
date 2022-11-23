const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`DB connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`ERROR connecting to DB ${error}`);
    }
};

module.exports = connectDB;
