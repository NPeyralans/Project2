/* app.js */
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/users');
const deviceRoutes = require('./routes/devices');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));

module.exports = app;
