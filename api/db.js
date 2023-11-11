const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "leshpq.db");
const db = new sqlite3.Database(dbPath);

// Create pin table if not exists
db.serialize(() => {
	db.run(`
    CREATE TABLE IF NOT EXISTS pin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      value TEXT
    )
  `);

	// Check if there are no records in the 'pin' table
	db.get("SELECT COUNT(*) AS count FROM pin", (err, result) => {
		if (err) {
			console.error("Error checking for existing pins:", err);
			return;
		}

		if (result.count === 0) {
			// Add a default PIN from .env to the database only if the table is empty
			const defaultPin = process.env.DEFAULT_PIN || "123457";
			db.run(
				"INSERT INTO pin (value) VALUES (?)",
				[defaultPin],
				(insertErr) => {
					if (insertErr) {
						console.error("Error inserting default PIN:", insertErr);
					} else {
						console.log("Default PIN inserted successfully");
					}
				}
			);
		}
	});
});

// Create questions table if not exists
db.serialize(() => {
	db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT,
      answer TEXT,
      type TEXT,
      topic TEXT,
      contributor TEXT,
      options TEXT, -- Stored as JSON string, can be parsed in code
      tags TEXT, -- Stored as JSON string, can be parsed in code
      date_added DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Export the database instance
module.exports = db;
