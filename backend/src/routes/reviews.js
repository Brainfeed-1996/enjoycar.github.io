const express = require("express");
const Review = require("../models/review");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

// Laisser un avis après un trajet
router.post("/", authenticateToken, async (req, res) => {
  const { reviewedId, rideId, rating, comment } = req.body;
  try {
    const review = await Review.create({
      reviewerId: req.user.id,
      reviewedId,
      rideId,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Consulter les avis d'un utilisateur
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const reviews = await Review.findByUser(userId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
