const mongoose = require("mongoose");
const dataUrl =
  "mongodb://localhost:27017/restaurants?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const dbconnection = () => {
  mongoose.connect(
    dataUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("database connect...");
    }
  );
};
module.exports = dbconnection;