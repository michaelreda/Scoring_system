var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    team1:{type:Number,default:0},team2:{type:Number,default:0},team3:{type:Number,default:0},team4:{type:Number,default:0}
})

  var Money = mongoose.model("money", Schema);

  module.exports = Money;