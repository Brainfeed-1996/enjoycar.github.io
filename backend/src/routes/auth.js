const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Inscription
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, phone, isDriver } = req.body;
  try {
    const existing = await User.findByEmail(email);
    if (existing) return res.status(400).json({ error: "Email déjà utilisé" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      passwordHash,
      firstName,
      lastName,
      phone,
      isDriver,
    });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Connexion
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user)
      return res.status(400).json({ error: "Email ou mot de passe invalide" });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.status(400).json({ error: "Email ou mot de passe invalide" });
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token,
      user: { id: user.id, email: user.email, isDriver: user.is_driver },
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
