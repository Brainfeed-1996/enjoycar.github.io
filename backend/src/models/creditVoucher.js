const db = require("./index");

const CreditVoucher = {
  async create({ userId, code, amount, expiresAt }) {
    const result = await db.query(
      `INSERT INTO credit_vouchers (user_id, code, amount, expires_at)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, code, amount, expiresAt]
    );
    return result.rows[0];
  },
  async findByCode(code) {
    const result = await db.query(
      "SELECT * FROM credit_vouchers WHERE code = $1",
      [code]
    );
    return result.rows[0];
  },
  async findByUser(userId) {
    const result = await db.query(
      "SELECT * FROM credit_vouchers WHERE user_id = $1",
      [userId]
    );
    return result.rows;
  },
  async use(code) {
    const result = await db.query(
      "UPDATE credit_vouchers SET is_active = FALSE WHERE code = $1 RETURNING *",
      [code]
    );
    return result.rows[0];
  },
};

module.exports = CreditVoucher;
