const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
var colors = require('colors/safe');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", authRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(colors.cyan.underline(`Server is running on port ${PORT}`));
  });
});
