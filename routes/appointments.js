const express = require('express');
const router = express.Router(); // Set up routing
const db = require('../db'); // DB access

// 📅 Get all appointments for a specific clinic
router.get('/clinic/:clinicId', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM appointments WHERE clinic_id = $1',
    [req.params.clinicId]
  );
  res.json(result.rows); // Send back list of appointments
});

// 📆 Get all appointments for a specific patient
router.get('/patient/:patientId', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM appointments WHERE patient_id = $1',
    [req.params.patientId]
  );
  res.json(result.rows); // Send back that patient’s appointments
});

// ➕ Schedule a new appointment
router.post('/', async (req, res) => {
  const { patient_id, clinic_id, date_time, type, notes } = req.body;
  const result = await db.query(
    `INSERT INTO appointments (patient_id, clinic_id, date_time, type, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [patient_id, clinic_id, date_time, type, notes]
  );
  res.status(201).json(result.rows[0]); // Return the new appointment
});

module.exports = router;
