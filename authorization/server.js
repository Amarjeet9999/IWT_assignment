const express = require("express");
const app = express();
// Path modules is used to handling the file path
const path = require("path");
// connect is a functions for connecting database
const connect = require("./src/Configs/db");

const userController = require("./src/controllers/users.controller");

// express.json() is a middleware used to parsing the JSON object in JavaScript object
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/view/"));
app.use("/static", express.static(path.join(__dirname, "src/public")));

app.use("/", userController);

// Function for creating a express server
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
