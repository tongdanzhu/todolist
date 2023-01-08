const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); // require local module

const app = express();
const items = ["Daily module", "Get up early"]; // array to store all input tasks
const workList = [];

// tell js to use static css
app.use(express.static("public"));
// Using Body parser
app.use(bodyParser.urlencoded({extended: true}));

// Using EJS
app.set("view engine", "ejs");

app.listen(3000, function(){
  console.log("Server started on port 3000");
});

app.get("/", function(req, res){
  let day = date.getDate();
  res.render("list", {day: day,  items: items});
});

// Handle form post request
app.post("/", function(req, res){

  console.log(req.body);

  let item = req.body.newTask;

  if (req.body.button === "Work"){
    if (item != ""){
      workList.push(item);
    }
    res.redirect("/work");
  }
  else{
    if (item != ""){
      items.push(item); // append new task into items array
    }
    res.redirect("/"); // redirect to home route
  }

})

app.get("/work", function(req, res){
  res.render("list", {day: "Work list", items: workList});
});

app.get("/about", function(req, res){
  res.render("about");
});
