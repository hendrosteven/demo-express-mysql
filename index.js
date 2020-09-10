const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//setting cors
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, HEAD, OPTIONS");
    next();
});

app.get("/", function(req, res) {
    res.json({message: "Welcome to ExpressJS"});
});

require("./app/routes/book.routes.js")(app);

const port = 8080;
app.listen(port, function() {
    console.log(`ExpressJS server listening on ${port}`);
});