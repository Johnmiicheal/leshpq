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
		"CREATE TABLE IF NOT EXISTS pins (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT)"
	);

	// Add a default PIN from .env to the database
	const defaultPin = process.env.DEFAULT_PIN || "123457";
	db.run("INSERT OR IGNORE INTO pins (value) VALUES (?)", [defaultPin]);
});

app.post("/auth/pin", (req, res) => {
	const { pinValues } = req.body;
	console.log(pinValues);

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
			// PIN doesn't exist, return an error or add a default PIN
			res.status(401).json({ error: "Invalid PIN" });
		}
	});
});

app.listen(port, () => {
	console.log(`\nServer is running at http://localhost:${port}\n`);
});
