var mongoose = require('mongoose');
var team_upgrades={
        beds:[]
        ,rooms:[]
        ,cars:[]
        ,tables:[]
      }
var Schema = mongoose.Schema({
    team1:team_upgrades,team2:team_upgrades,team3:team_upgrades,team4:team_upgrades
})

  var Upgrades = mongoose.model("upgrades", Schema);

  module.exports = Upgrades;