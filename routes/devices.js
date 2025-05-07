/* devices.js */ 
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/query', async (req, res) => {
	const { username } = req.query;

	const sql = `
		SELECT d.*
		FROM devices d
		JOIN users u ON d.user_id = u.user_id
		WHERE u.username = ?
	`;

	db.query(sql, [username], (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({
				error: "Database error"
			});
		}

		res.json(results);
	});
	
});

router.post('/', async (req, res) => {
	const { username, email } = req.body;

	if (!username){
		return res.status(400).send('Must submit a unique username');
	}

	const query = 'INSERT INTO device (username, email) VALUES (?, ?)';
	const values = [username, email || null];

	db.query(query, values, (err, result) => {
		if (err) {
			console.error("DB Insert Error:", err.message);
			return res.status(500).json({
				error: 'Database error'
			});
		}
		console.log('User inserted with ID: ',result.insertId);
		res.status(201).send(`User added with ID ${result.insertId}`);
	});
});

module.exports = router;
