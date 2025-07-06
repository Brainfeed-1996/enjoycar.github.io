const db = require("./index");

const DriverLicense = {
  async create({ userId, licenseNumber, licensePhotoUrl }) {
    const result = await db.query(
      `INSERT INTO driver_licenses (user_id, license_number, license_photo_url)
       VALUES ($1, $2, $3) RETURNING *`,
      [userId, licenseNumber, licensePhotoUrl]
    );
    return result.rows[0];
  },
  async findByUser(userId) {
    const result = await db.query(
      "SELECT * FROM driver_licenses WHERE user_id = $1",
      [userId]
    );
    return result.rows[0];
  },
  async verify(id) {
    const result = await db.query(
      "UPDATE driver_licenses SET verified = TRUE WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};

module.exports = DriverLicense;
