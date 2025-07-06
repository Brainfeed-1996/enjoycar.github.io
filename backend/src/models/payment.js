const db = require("./index");

const Payment = {
  async create({ bookingId, amount, commission, paymentMethod }) {
    const result = await db.query(
      `INSERT INTO payments (booking_id, amount, commission, payment_method)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [bookingId, amount, commission, paymentMethod]
    );
    return result.rows[0];
  },
  async findByBooking(bookingId) {
    const result = await db.query(
      "SELECT * FROM payments WHERE booking_id = $1",
      [bookingId]
    );
    return result.rows[0];
  },
};

module.exports = Payment;
