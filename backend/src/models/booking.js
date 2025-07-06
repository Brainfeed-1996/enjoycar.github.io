const db = require("./index");

const Booking = {
  async create({ rideId, passengerId, seatsReserved, totalPrice }) {
    const result = await db.query(
      `INSERT INTO bookings (ride_id, passenger_id, seats_reserved, total_price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [rideId, passengerId, seatsReserved, totalPrice]
    );
    return result.rows[0];
  },
  async findById(id) {
    const result = await db.query("SELECT * FROM bookings WHERE id = $1", [id]);
    return result.rows[0];
  },
  async findByRide(rideId) {
    const result = await db.query("SELECT * FROM bookings WHERE ride_id = $1", [
      rideId,
    ]);
    return result.rows;
  },
};

module.exports = Booking;
