const db = require("./index");

const Message = {
  async create({ senderId, receiverId, bookingId, content }) {
    const result = await db.query(
      `INSERT INTO messages (sender_id, receiver_id, booking_id, content)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [senderId, receiverId, bookingId, content]
    );
    return result.rows[0];
  },
  async findByBooking(bookingId) {
    const result = await db.query(
      "SELECT * FROM messages WHERE booking_id = $1 ORDER BY sent_at ASC",
      [bookingId]
    );
    return result.rows;
  },
};

module.exports = Message;
