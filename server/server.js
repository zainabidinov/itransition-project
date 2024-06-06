const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const itemRoutes = require("./routes/itemRoutes")
var colors = require("colors/safe");
const cors = require("cors");

const { User, Collection, Item } = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", userRoutes);
app.use("/api", collectionRoutes);
app.use("/api", itemRoutes);



sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(colors.cyan.underline(`Server is running on port ${PORT}`));
  });
});
