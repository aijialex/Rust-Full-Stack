const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isEndangered: {
    type: Boolean,
    default: true
  },
  dateOfEntry: {
    type: Date,
    default: Date.now()
  }
});

const Item = mongoose.model('animal', AnimalSchema);

module.exports = Item;
