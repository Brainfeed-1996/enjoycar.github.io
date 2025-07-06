const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const ridesRouter = require("./rides");
const bookingsRouter = require("./bookings");
const paymentsRouter = require("./payments");
const messagesRouter = require("./messages");
const reviewsRouter = require("./reviews");
const driverLicensesRouter = require("./driverLicenses");
const creditVouchersRouter = require("./creditVouchers");

// Exemple de route
router.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

router.use("/auth", authRouter);
router.use("/rides", ridesRouter);
router.use("/bookings", bookingsRouter);
router.use("/payments", paymentsRouter);
router.use("/messages", messagesRouter);
router.use("/reviews", reviewsRouter);
router.use("/driver-licenses", driverLicensesRouter);
router.use("/credit-vouchers", creditVouchersRouter);

module.exports = router;
