const db = require("./index");

const Review = {
  async create({ reviewerId, reviewedId, rideId, rating, comment }) {
    const result = await db.query(
      `INSERT INTO reviews (reviewer_id, reviewed_id, ride_id, rating, comment)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [reviewerId, reviewedId, rideId, rating, comment]
    );
    return result.rows[0];
  },
  async findByUser(userId) {
    const result = await db.query(
      "SELECT * FROM reviews WHERE reviewed_id = $1",
      [userId]
    );
    return result.rows;
  },
};

module.exports = Review;
