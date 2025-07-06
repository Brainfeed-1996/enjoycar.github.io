const express = require("express");
const DriverLicense = require("../models/driverLicense");
const authenticateToken = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Configuration de multer pour l'upload de fichiers (stockage local temporaire)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../../uploads/licenses");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// Upload du permis de conduire
router.post(
  "/upload",
  authenticateToken,
  upload.single("licensePhoto"),
  async (req, res) => {
    const { licenseNumber } = req.body;
    const licensePhotoUrl = `/uploads/licenses/${req.file.filename}`;
    try {
      const license = await DriverLicense.create({
        userId: req.user.id,
        licenseNumber,
        licensePhotoUrl,
      });
      res.status(201).json(license);
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
);

// Consulter le permis d'un utilisateur
router.get("/user/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const license = await DriverLicense.findByUser(userId);
    res.json(license);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Vérifier un permis (à faire par un admin, ici route ouverte pour la démo)
router.post("/verify/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const license = await DriverLicense.verify(id);
    res.json(license);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
