const express = require("express");
const Ride = require("../models/ride");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

// Création d'un trajet (conducteur)
router.post("/", authenticateToken, async (req, res) => {
  const {
    origin,
    destination,
    date,
    time,
    availableSeats,
    price,
    description,
  } = req.body;
  try {
    const ride = await Ride.create({
      driverId: req.user.id,
      origin,
      destination,
      date,
      time,
      availableSeats,
      price,
      description,
    });
    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Recherche de trajets
router.get("/search", async (req, res) => {
  const { origin, destination, date } = req.query;
  try {
    const rides = await Ride.search({ origin, destination, date });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
