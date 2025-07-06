const express = require("express");
const CreditVoucher = require("../models/creditVoucher");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

// Ajouter un bon/crédit à un utilisateur (admin ou promo)
router.post("/add", authenticateToken, async (req, res) => {
  const { code, amount, expiresAt } = req.body;
  try {
    const voucher = await CreditVoucher.create({
      userId: req.user.id,
      code,
      amount,
      expiresAt,
    });
    res.status(201).json(voucher);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Consulter ses crédits/bons
router.get("/my", authenticateToken, async (req, res) => {
  try {
    const vouchers = await CreditVoucher.findByUser(req.user.id);
    res.json(vouchers);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Utiliser un bon/crédit
router.post("/use", authenticateToken, async (req, res) => {
  const { code } = req.body;
  try {
    const voucher = await CreditVoucher.findByCode(code);
    if (!voucher || !voucher.is_active) {
      return res.status(400).json({ error: "Bon invalide ou déjà utilisé" });
    }
    // Ici, on désactive le bon (en vrai, il faudrait aussi créditer le compte utilisateur)
    await CreditVoucher.use(code);
    res.json({ message: "Bon utilisé", amount: voucher.amount });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
