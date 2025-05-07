# Project2

A web application that connects a MySQL backend database to a browser interface using Node.js and Express.js. This project provides a simple way to query and update user and device information through a clean web interface.

## Table of Contents
- [Goals](#goals)
- [Frontend](#frontend)
- [Backend](#backend)
- [Installation](#installation)
- [Features](#features)
- [Limitations](#limitations)

## Goals
- Create a web interface for querying and managing users and devices
- Implement a MySQL backend to simulate real-world relational database usage
- Use Node.js and Express for routing and API development
- Containerize the application using Docker

## Frontend
The following user-facing HTML pages are provided:
- `query_users.html` – Query existing users
- `query_devices.html` – Query devices registered to a user
- `add_users.html` – Add a new user to the database
- `add_devices.html` – Register a new device to a user

## Backend
RESTful API endpoints include:
- `GET /users/query?username=` — Query user details by username
- `POST /users` — Add a new user
- `GET /devices/query?username=` — Get devices registered to a user
- `POST /devices` — Register a new device

## Installation

## Features

- Simple user/device management via browser  
- Query user or device data using API endpoints  
- Real-time frontend feedback with dynamic output  
- Form validation to ensure correct input before submission  
- Clean and responsive UI using vanilla HTML, CSS, and JavaScript  
- Parameterized SQL queries to prevent SQL injection  
- Consistent JSON-based API with proper error responses  
- Docker-compatible for easy local or remote deployment

## Limitations
This is a rudimentary project meant for improving front-end to back end
interaction; It is lacking significantly in sanitizing user input which
could have significant improvments. As it is, there is no sanitation.
