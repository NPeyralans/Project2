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

module.exports = router;
