require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const routes = require("./routes");
app.use("/api", routes);

// Routes à venir
app.get("/", (req, res) => {
  res.send("API BlaBlaCar Clone en ligne");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur le port ${PORT}`);
});
