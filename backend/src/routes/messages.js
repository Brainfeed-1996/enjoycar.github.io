const express = require("express");
const Message = require("../models/message");
const Booking = require("../models/booking");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

// Envoyer un message lié à une réservation
router.post("/", authenticateToken, async (req, res) => {
  const { bookingId, receiverId, content } = req.body;
  try {
    // Vérification que l'utilisateur fait partie de la réservation
    const booking = await Booking.findById(bookingId);
    if (!booking)
      return res.status(404).json({ error: "Réservation non trouvée" });
    if (![booking.passenger_id, booking.ride_id].includes(req.user.id)) {
      return res.status(403).json({ error: "Non autorisé" });
    }
    const message = await Message.create({
      senderId: req.user.id,
      receiverId,
      bookingId,
      content,
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Récupérer la conversation d'une réservation
router.get("/:bookingId", authenticateToken, async (req, res) => {
  const { bookingId } = req.params;
  try {
    const messages = await Message.findByBooking(bookingId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
