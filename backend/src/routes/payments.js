const express = require("express");
const Payment = require("../models/payment");
const Booking = require("../models/booking");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

// Paiement d'une réservation
router.post("/", authenticateToken, async (req, res) => {
  const { bookingId, paymentMethod } = req.body;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking)
      return res.status(404).json({ error: "Réservation non trouvée" });
    if (booking.passenger_id !== req.user.id)
      return res.status(403).json({ error: "Non autorisé" });
    // Commission de 10% par exemple
    const commission = Math.round(booking.total_price * 0.1 * 100) / 100;
    const payment = await Payment.create({
      bookingId,
      amount: booking.total_price,
      commission,
      paymentMethod,
    });
    // Ici, on simule le paiement (intégration Stripe/PayPal à faire en prod)
    res.status(201).json({
      payment,
      message: "Paiement simulé, à intégrer avec Stripe/PayPal.",
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
