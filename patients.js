const express = require('express');
const router = express.Router(); // Create a mini Express app (just for routes)
const db = require('../db'); // Our database helper

// 🏥 Get all patients in a specific clinic
router.get('/clinic/:clinicId', async (req, res) => {
  const { clinicId } = req.params; // Grab clinic ID from the URL
  const result = await db.query(
    'SELECT * FROM patients WHERE clinic_id = $1',
    [clinicId]
  );
  res.json(result.rows); // Send back all patients in that clinic
});

// 👤 Get one patient by their ID
router.get('/:id', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM patients WHERE id = $1',
    [req.params.id]
  );
  res.json(result.rows[0]); // Send back the specific patient
});

// ➕ Create a new patient entry
router.post('/', async (req, res) => {
  const { user_id, clinic_id, dob, notes, allergies } = req.body; // Info from request
  const result = await db.query(
    `INSERT INTO patients (user_id, clinic_id, dob, notes, allergies)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`, // Return the new patient
    [user_id, clinic_id, dob, notes, allergies]
  );
  res.status(201).json(result.rows[0]); // Respond with the new patient
});

module.exports = router; // Export the router so server.js can use it
