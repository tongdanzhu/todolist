const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = []; // array to store all input tasks

// Using Body parser
app.use(bodyParser.urlencoded({extended: true}));

// Using EJS
app.set("view engine", "ejs");

app.listen(3000, function(){
  console.log("Server started on port 3000");
});

app.get("/", function(req, res){

  // Formating Date info
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US", options);
  res.render("list", {day: day, items: items});

});

// Handle form post request
app.post("/", function(req, res){
  console.log(req.body.newTask);

  var item = req.body.newTask;
  items.push(item); // append new task into items array

  res.redirect("/"); // redirect to home route
})
