import { pool } from "../config/database.js";
import "../config/dotenv.js";
import giftData from "../data/gifts.js";

const createGiftsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      groupname VARCHAR(255) NOT NULL,
      imagelink VARCHAR(255) NOT NULL,
      date VARCHAR(255) NOT NULL,
      arenaimage VARCHAR(255) NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 events table created successfully");
  } catch (err) {
    console.error("⚠️ error creating events table", err);
  }
};

const seedGiftsTable = async () => {
  await createGiftsTable();

  giftData.forEach((gift) => {
    const insertQuery = {
      text: "INSERT INTO events (name, location, groupname, imagelink, date, arenaimage) VALUES ($1, $2, $3, $4, $5, $6)",
    };

    const values = [
      gift.name,
      gift.location,
      gift.groupName,
      gift.imageLink,
      gift.date,
      gift.arenaImage,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting events", err);
        return;
      }
      console.log(`✅ ${gift.name} added successfully`);
    });
  });
};

seedGiftsTable();
