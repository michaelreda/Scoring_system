var mongoose = require('mongoose');
var team_upgrades={
        hotel:{ 
          purchased: {type:Boolean ,default: false},
          rooms:  {type:Number ,default: 0}
        },hospital:{
          purchased: {type:Boolean ,default: false},
          beds:{type:Number ,default: 0}
        },cars_shop:{
          purchased: {type:Boolean ,default: false},
          cars:{type:Number ,default: 0}
        },restaurant:{
          purchased: {type:Boolean ,default: false},
          tables:{type:Number ,default: 0}
        }
}
var Schema = mongoose.Schema({
    team1:team_upgrades,team2:team_upgrades,team3:team_upgrades,team4:team_upgrades
})

  var Purchases = mongoose.model("purchases", Schema);

  module.exports = Purchases;