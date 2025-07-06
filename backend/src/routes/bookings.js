const express = require("express");
const Booking = require("../models/booking");
const Ride = require("../models/ride");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

// Réserver un trajet
router.post("/", authenticateToken, async (req, res) => {
  const { rideId, seatsReserved } = req.body;
  try {
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ error: "Trajet non trouvé" });
    if (ride.available_seats < seatsReserved) {
      return res.status(400).json({ error: "Pas assez de places disponibles" });
    }
    const totalPrice = Number(ride.price) * seatsReserved;
    const booking = await Booking.create({
      rideId,
      passengerId: req.user.id,
      seatsReserved,
      totalPrice,
    });
    // Mise à jour du nombre de places disponibles (à faire dans Ride)
    await Ride.updateAvailableSeats(
      rideId,
      ride.available_seats - seatsReserved
    );
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
