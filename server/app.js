// Import all server modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mysql = require('mysql2');

// Express setup
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));
app.listen(8081, () => {
    console.log("server is running on port: 8081")
});

// Mongodb setup
mongoose.connect('mongodb://localhost:27017/test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("connected to db");
})
.catch((error) => {
    console.error("error connecting to db", error);
});