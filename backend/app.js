const express = require('express');
const mongoose = require('mongoose');
const { mongoUrl } = require("./keys");
const cors = require("cors")
const app = express();
const port = 5000;

app.use(cors());
require("./models/model");
require("./models/post");
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/createPost'));
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

mongoose.connection.on("connected" ,
() => {
    console.log("successfully connected to mongo");
});

mongoose.connection.on("error", () => {
    console.error("Error in connect to mongo");
})


app.listen(port, () => {
    console.log("Server is running on port " + port);
})