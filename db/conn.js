const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Connecting to database
//mongoose.connect returns a promise
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
);
mongoose.set('strictQuery', false)
mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })
    .then(() => console.log('DB connection successful!'))