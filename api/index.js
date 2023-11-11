const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv").config();
const db = require("./db");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/auth/pin", (req, res) => {
	const { pinValues } = req.body;

	// Convert the array of digits to a single string PIN
	const pin = pinValues.join("");

	// Check if the entered PIN exists in the database
	db.get("SELECT * FROM pin WHERE value = ?", [pin], (err, row) => {
		if (err) {
			return res.status(500).json({ error: "Error querying the database" });
		}

		if (row) {
			res.json({ message: "PIN matched. Redirecting to the search page" });
		} else {
			res.status(401).json({ error: "Invalid PIN" });
		}
	});
});

// API endpoint for searching questions
app.get("/search", (req, res) => {
	const { query } = req.query;

	// Check if the search query is at least 3 characters long
	if (!query || query.length < 3) {
		return res
			.status(400)
			.json({ error: "Search query must be at least 3 characters long" });
	}

	const searchQuery = `%${query}%`;

	// Use LIKE clause for a basic search on multiple fields
	db.all(
		"SELECT * FROM questions WHERE " +
			"question LIKE ? OR " +
			"answer LIKE ? OR " +
			"type LIKE ? OR " +
			"topic LIKE ? OR " +
			"contributor LIKE ? OR " +
			"options LIKE ? OR " +
			"tags LIKE ?",
		[
			searchQuery,
			searchQuery,
			searchQuery,
			searchQuery,
			searchQuery,
			searchQuery,
			searchQuery,
		],
		(err, rows) => {
			if (err) {
				return res.status(500).json({ error: "Error querying the database" });
			}

			const results = rows.map((row) => {
				return {
					id: row.id,
					question: row.question,
					answer: row.answer,
					type: row.type,
					topic: row.topic,
					contributor: row.contributor,
					options: JSON.parse(row.options || "[]"), // Parse JSON string to array
					tags: JSON.parse(row.tags || "[]"), // Parse JSON string to array
					date_added: row.date_added,
				};
			});

			res.json({ results });
		}
	);
});

// API endpoint for adding a new question
app.post("/question/add", (req, res) => {
	const { question, answer, type, topic, contributor, options, tags } =
		req.body;

	if (!question || !answer || !type) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	const optionsString = JSON.stringify(options || []);
	const tagsString = JSON.stringify(tags || []);

	db.run(
		"INSERT INTO questions (question, answer, type, topic, contributor, options, tags) VALUES (?, ?, ?, ?, ?, ?, ?)",
		[question, answer, type, topic, contributor, optionsString, tagsString],
		function (err) {
			if (err) {
				return res
					.status(500)
					.json({ error: "Error inserting into the database" });
			}

			res.json({ id: this.lastID });
		}
	);
});

app.listen(port, () => {
	console.log(`\nServer is running at http://localhost:${port}\n`);
});
