// Import Express and create a router to define our routes
const express = require('express');
const router = express.Router();

// Import our database connection logic
const db = require('../db');

// 👤 Route to create a new user (dentist, patient, or admin)
router.post('/', async (req, res) => {
  // Pull values from the request body
  const { name, email, password_hash, role, clinic_id } = req.body;

  // Insert the user into the 'users' table in the database
  const result = await db.query(
    `INSERT INTO users (name, email, password_hash, role, clinic_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`, // RETURNING * gives us the newly created user back
    [name, email, password_hash, role, clinic_id] // These values are passed into the SQL query
  );

  // Respond with the created user (status 201 = created)
  res.status(201).json(result.rows[0]);
});

// 👁️ Route to get a user by their ID
router.get('/:id', async (req, res) => {
  // Run a SELECT query to find the user by ID
  const result = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);

  // Respond with the user info
  res.json(result.rows[0]);
});

// Export this file so it can be used in server.js
module.exports = router;
