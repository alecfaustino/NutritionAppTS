require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;

const cors = require("cors");
app.use(cors());
const morgan = require("morgan");
app.use(express.json());
app.use(morgan("dev"));

// router definition
const spoonRoutes = require("./routes/spoon-api");
const usdaRoutes = require("./routes/usda-api");

// router mounting
app.use("/api/spoon", spoonRoutes);
app.use("/api/usda", usdaRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
