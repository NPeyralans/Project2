/* users.js */ 
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/query', async (req, res) => {
	console.log("inside users.js");
	const { username } = req.query;
	console.log("After getting req");
	if (username) {
		// If a username was passed
		db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
			if (err) return res.status(500).send('DB Error');
			res.json(results);
		});
	} else {
		// No username passed as query param
	}
});

router.post('/', async (req, res) => {
	const { username, email } = req.body;

	if (!username){
		return res.status(400).send('Must submit a unique username');
	}

	const query = 'INSERT INTO users (username, email) VALUES (?, ?)';
	const values = [username, email || null];

	db.query(query, values, (err, result) => {
		if (err) {
			console.error("DB Insert Error:", err.message);
			return res.status(500).send('Database error');
		}
		console.log('User inserted with ID: ',result.insertId);
		res.status(201).send(`User added with ID ${result.insertId}`);
	});
});

module.exports = router;
