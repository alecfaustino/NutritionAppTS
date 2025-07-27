require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;

const morgan = require("morgan");
app.use(express.json());
app.use(morgan("dev"));

// router definition
const spoonRoutes = require("./routes/spoon-api");

// router mounting
app.use("/api/spoon", spoonRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});