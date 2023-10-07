import { pool } from "../config/database.js";

const getGifts = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM events ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    console.log("error");
    res.status(400).json({ error: error.message });
  }
};

const getGiftById = async (req, res) => {
  try {
    const giftId = req.params.EventId;
    console.log("Gift Id: " + giftId);
    const selectQuery = `SELECT name, location, groupname, imagelink, arenaimage, date FROM events WHERE id = ${giftId}`;
    const results = await pool.query(selectQuery);

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getGifts,
  getGiftById,
};
