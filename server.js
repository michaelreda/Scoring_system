// server.js
const express = require('express');
const app = express();

var mongoose = require('mongoose');
var DB_URI = "mongodb://admin:admin@ds145273.mlab.com:47920/scoring_system";
var bodyParser = require('body-parser');
var Router = express.Router();
var path = require('path');
app.use(require('serve-static')(path.resolve('public')));

app.use(bodyParser.urlencoded({ extended: false })); //this line must be on top of app config
app.use(bodyParser.json());

mongoose.connect(DB_URI, {
  useMongoClient: true},function(err){
  if(err){
    console.log(err);
  }else{
    console.log("connecting to global db..");
  }
});
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
// app.listen(8080);
console.log("server started")

// const path = require('path');
// // ...
// // For all GET requests, send back index.html
// // so that PathLocationStrategy can be used
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.options('/*', function (req, res) {
  res.sendStatus(200);
});



var Money = require("./Money");
var Purchases = require("./Purchases");
var Upgrades = require("./Upgrades");

app.post('/backup', function (req, res) {
  console.log(req.body);
  let newMoney = new Money();
  console.log("1");
  newMoney.backup = req.body.money;
  console.log("2");
  newMoney.save((err) => {
    console.log("3");
    if (err) res.send(err);
    else {
      console.log("4");
      let newPurchases = new Purchases();
      console.log("5");
      newPurchases.backup = req.body.purchases;
      console.log("6");
      newPurchases.save((err) => {
        console.log("7");
        if (err) res.send(err);
        else {
          console.log("8");
          let newUpgrades = new Purchases();
          console.log("9");
          newUpgrades.backup = req.body.upgrades;
          console.log("10");
          newUpgrades.save((err) => {
            console.log("hi");
            if (err) res.send(err);
            else {
              console.log("h2");
              res.sendStatus(200);
            }
          })
        }
      })
    }
  })
});

app.get('/restore_money', function (req, res) {
  console.log(req.body);
  Money.findOne({}, {}, { sort: { 'created_at': -1 } }, function (err, money) {
    res.send(money);
  });
});

app.get('/restore_upgrades', function (req, res) {
  console.log(req.body);
  Upgrades.findOne({}, {}, { sort: { 'created_at': -1 } }, function (err, upgrades) {
    res.send(upgrades);
  });
});

app.get('/restore_purchases', function (req, res) {
  console.log(req.body);
  Purchases.findOne({}, {}, { sort: { 'created_at': -1 } }, function (err, purchases) {
    res.send(purchases);
  });
});