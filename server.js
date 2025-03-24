const express = require("express");
const app = express();
const db = require("./db"); // make sure db.js is in the same folder

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body

app.get("/", (req, res) => {
  res.send("Hello World");
});

const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
