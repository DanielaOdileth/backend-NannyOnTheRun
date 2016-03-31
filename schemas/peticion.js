var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var PeticionSchema = new mongoose.Schema({
  idnanny : String,
  iduser : String,
  datein: String,
  dateout : String,
  statusnanny : String,
  statususer : String
});

module.exports = mongoose.model('Peticion', PeticionSchema);
