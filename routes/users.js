/* users.js */ 
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/query', async (req, res) => {
	console.log("inside users.js");
	const { username } = req.query;
	console.log("After getting req", username);
	if (!username) {
		return res.status(400).json({ error: "Username is required." });	
	}

	try {
		const [results] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
		console.log("Query results:", results);
		if (results.length === 0) {
			return res.status(404).send('User not found');
		}
		res.json(results);
	} catch(err){
		console.error("DB Error:", err.message);
		res.status(500).send('DB Error');
	}
});

router.post('/', async (req, res) => {
	const { username, email } = req.body;

	if (!username){
		return res.status(400).json({
			error: "Must submit a unique username"
		});
	}

	const query = 'INSERT INTO users (username, email) VALUES (?, ?)';
	const values = [username, email || null];

	try {
		const [result] = await db.query(query, values);
		console.log('User inserted with ID:', result.insertId);
		res.status(201).json({
			message: "User successfully added!",
			user_id: result.insertId
		});
	} catch(err){
		console.error("DB Error:", err.message);
		res.status(500).send('DB Error');
	}
});


module.exports = router;
