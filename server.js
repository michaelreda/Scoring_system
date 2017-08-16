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

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
console.log("server started")

// const path = require('path');
// // ...
// // For all GET requests, send back index.html
// // so that PathLocationStrategy can be used
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

var Money = require("./Money");
var Purchases = require("./Purchases");
var Upgrades = require("./Upgrades");

Router.post('/backup', function (req, res) {
  console.log(req.body);
  let newMoney = new Money(req.body.money);
  newMoney.save((err) => {
    if (err) res.send(err);
    else {
      let newPurchases = new Purchases(req.body.purchases);
      newPurchases.save((err) => {
        if (err) res.send(err);
        else {
          let newUpgrades = new Purchases(req.body.upgrades);
          newUpgrades.save((err) => {
            if (err) res.send(err);
            else {
              res.sendStatus(200);
            }
          })
        }
      })
    }
  })
});

Router.get('/restore', function (req, res) {
  console.log(req);
});