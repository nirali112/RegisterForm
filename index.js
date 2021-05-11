const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin : 'http://localhost:4200'}));


app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

require("./routes/employee.routes")(app);


app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
