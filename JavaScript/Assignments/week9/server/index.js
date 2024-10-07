const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter)
app.use("/user", userRouter)

const user_mongo = process.env.USER_MONGO
const mongo_Pass = process.env.MONGO_PASS

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect(`mongodb+srv://${user_mongo}:${mongo_Pass}@cluster0.m7gnx.mongodb.net/`, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

app.listen(3000, () => console.log('Server running on port 3000'));
