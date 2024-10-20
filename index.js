var express = require("express");
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const route = require("./routes/index");

require('./config/mongoose');
require("dotenv").config();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', route);

app.use("/", (req, res) => {
    res.send("Hunghv2");
});

app.listen(port, () => {
    console.log("Server listening on " + port);
});