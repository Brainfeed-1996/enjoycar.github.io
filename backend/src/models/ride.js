const db = require("./index");

const Ride = {
  async create({
    driverId,
    origin,
    destination,
    date,
    time,
    availableSeats,
    price,
    description,
  }) {
    const result = await db.query(
      `INSERT INTO rides (driver_id, origin, destination, date, time, available_seats, price, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        driverId,
        origin,
        destination,
        date,
        time,
        availableSeats,
        price,
        description,
      ]
    );
    return result.rows[0];
  },
  async search({ origin, destination, date }) {
    const result = await db.query(
      `SELECT * FROM rides WHERE origin ILIKE $1 AND destination ILIKE $2 AND date = $3`,
      [origin, destination, date]
    );
    return result.rows;
  },
  async findById(id) {
    const result = await db.query("SELECT * FROM rides WHERE id = $1", [id]);
    return result.rows[0];
  },
  async updateAvailableSeats(id, availableSeats) {
    const result = await db.query(
      "UPDATE rides SET available_seats = $1 WHERE id = $2 RETURNING *",
      [availableSeats, id]
    );
    return result.rows[0];
  },
};

module.exports = Ride;
