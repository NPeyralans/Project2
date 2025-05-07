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
	const { username, device_name } = req.body;
	console.log("Received POST request: ", req.body);

	if (!username || !device_name){
		return res.status(400).json({ error: "Must submit a device name and user" });
	}

	const getUserQuery = 'SELECT user_id FROM users WHERE username = ?';
	db.query(getUserQuery, [username], (err, userResult) => {
		if (err) {
			console.error("DB lookup error:", err);
			return res.status(500).json({
				error: "Database error during user lookup"
			});
		}

		if (userResult.length === 0) {
			return res.status(404).json({
				error: "User not found"
			});
		}

		const user_id = userResult[0].user_id;

		const insertDeviceQuery = 'INSERT INTO devices (user_id, device_name) VALUES (?, ?)';
		db.query(insertDeviceQuery, [user_id, device_name], (err, deviceResult) => {
			if (err) {
				console.error("DB insert error:", err);
				return res.status(500).json({
					error: "Database insert error"
				});
			}

			res.status(201).json({
				message: "Device successfully added!",
				device_id: deviceResult.insertId,
				device_name,
				username
			});
		});
	});
});

module.exports = router;
