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

	try {
		const [results] = await db.query(sql, [username]);
		if (results.length === 0) {
			return res.status(404).send('No devices registered to that user.');
		}
		res.json(results);
	} catch (err) {
		console.error("DB query error:", err.message);
		res.status(500).json({ error: "Database error" });
	}
});

router.post('/', async (req, res) => {
	const { username, device_name } = req.body;
	console.log("Received POST request: ", req.body);

	if (!username || !device_name){
		return res.status(400).json({ error: "Must submit a device name and user" });
	}

	try {
		const getUserQuery = 'SELECT user_id FROM users WHERE username = ?';
		const [userResult] = await db.query(getUserQuery, [username]);
		
		if (userResult.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		const user_id = userResult[0].user_id;

		const insertDeviceQuery = 'INSERT INTO devices (user_id, device_name) VALUES (?, ?)';
		const [deviceResult] = await db.query(insertDeviceQuery, [user_id, device_name]);

		res.status(201).json({
			message: "Device successfully added!",
			device_id: deviceResult.insertId,
			device_name,
			username
		});
	} catch (err){
		console.error("DB error:", err.message);
		res.status(500).json({ error: "Database error" });
	}
});

module.exports = router;
