const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Menu = new schema({
  restoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  foodname: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("menu", Menu);
