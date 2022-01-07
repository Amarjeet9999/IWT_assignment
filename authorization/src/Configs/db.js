const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.DB;

module.exports = async () => {
  try {
    await mongoose.connect(DB);
    console.log(`Mongo Db Connected`);
  } catch (err) {
    console.log(err);
  }
};
