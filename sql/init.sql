-- sql/init.sql
CREATE DATABASE IF NOT EXISTS project2;

USE project2;

CREATE TABLE IF NOT EXISTS users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(100),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS devices (
	device_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	device_name VARCHAR(100),
	device_type VARCHAR(10),
	registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO users (username, email) VALUES 
	('andy', 'andy@example.com'),
	('bob', 'bob@example.com'),
	('candy', 'candy@example.com'),
	('doug', 'doug@example.com'),
	('rob', 'rob@example.com');

INSERT INTO devices (device_name, user_id) VALUES 
	('device1', '1'),
	('device5', '2'),
	('device4', '3'),
	('device3', '5'),
	('device2', '3');
