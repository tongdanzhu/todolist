const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js"); // require local module

const app = express();
const workList = [];

// tell js to use static css
app.use(express.static("public"));
// Using Body parser
app.use(bodyParser.urlencoded({
  extended: true
}));

// Using EJS
app.set("view engine", "ejs");

// mongoose set
mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {
  useNewUrlParser: true
});

// Schema
const itemsSchema = {
  name: String
};

// Model
const Item = mongoose.model("Item", itemsSchema);

// Documents
const oneModule = new Item({
  name: "1 Module"
});

const thirtyMinsApplyJob = new Item({
  name: "30 mins applying"
});

const getUp = new Item({
  name: "Get up"
});



// Server listener
app.listen(3000, function() {
  console.log("Server started on port 3000");
});

app.get("/", function(req, res) {
  let day = date.getDate();

  Item.find({}, function(err, docs) {

    if (docs.length === 0) { // insert default daily jobs only if database is empty
      const dailyJob = [oneModule, thirtyMinsApplyJob, getUp];

      Item.insertMany(dailyJob, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully insert daily jobs");
        }
      });
      res.redirect("/"); // refresh

    } else { // database not empty
      res.render("list", {
        day: day,
        items: docs
      });
    }

    if (err) {
      console.log(err);
    }
  });

});

// Handle form post request (Adding new items)
app.post("/", function(req, res) {

  let item = req.body.newTask;

  if (item != "") {
    // Insert new adding item
    const newItem = new Item({
      name: item
    });
    newItem.save();
  }

  res.redirect("/"); // redirect to home route

});

app.post("/delete", function(req, res){

  const deleteItem = req.body.checkbox;

  Item.findByIdAndRemove(deleteItem, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Successfully delete item");

      res.redirect("/");
    }
  });


});

app.get("/work", function(req, res) {
  res.render("list", {
    day: "Work list",
    items: workList
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});
