const express = require("express");
const app = express();
const connect = require("./src/Configs/db");
app.use(express.json());

const PORT = process.env.PORT || 4000;
module.exports = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
