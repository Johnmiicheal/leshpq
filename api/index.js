const express = require("express");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Initialize SQLite database
const dbPath = path.join(__dirname, "leshpq.db");
const db = new sqlite3.Database(dbPath);

// Create a table for pins if it doesn't exist
db.serialize(() => {
	db.run(
		"CREATE TABLE IF NOT EXISTS pin (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT)"
	);

	// Check if there are no records in the 'pins' table
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

app.post("/auth/pin", (req, res) => {
	const { pinValues } = req.body;

	// Convert the array of digits to a single string PIN
	const pin = pinValues.join("");

	// Check if the entered PIN exists in the database
	db.get("SELECT * FROM pins WHERE value = ?", [pin], (err, row) => {
		if (err) {
			return res.status(500).json({ error: "Error querying the database" });
		}

		if (row) {
			// PIN exists, proceed to the search page
			res.json({ message: "PIN matched. Redirecting to the search page" });
		} else {
			// PIN doesn't exist, return an error
			res.status(401).json({ error: "Invalid PIN" });
		}
	});
});

app.listen(port, () => {
	console.log(`\nServer is running at http://localhost:${port}\n`);
});
