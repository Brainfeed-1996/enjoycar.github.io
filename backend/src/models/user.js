const db = require("./index");

const User = {
  async create({ email, passwordHash, firstName, lastName, phone, isDriver }) {
    const result = await db.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, phone, is_driver)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [email, passwordHash, firstName, lastName, phone, isDriver]
    );
    return result.rows[0];
  },
  async findByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },
  async findById(id) {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },
};

module.exports = User;
