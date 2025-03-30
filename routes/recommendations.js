const express = require('express');
const router = express.Router(); // Router for /api/recommendations
const db = require('../db'); // DB access

// 📋 Get all treatment recommendations for a patient
router.get('/:patientId', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM recommendations WHERE patient_id = $1',
    [req.params.patientId]
  );
  res.json(result.rows); // Send all recommendations
});

// ➕ Add a new treatment recommendation
router.post('/', async (req, res) => {
  const { patient_id, tooth_number, treatment, urgency, due_date } = req.body;

  const result = await db.query(
    `INSERT INTO recommendations (patient_id, tooth_number, treatment, urgency, due_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [patient_id, tooth_number, treatment, urgency, due_date]
  );

  res.status(201).json(result.rows[0]); // Return the new recommendation
});

module.exports = router;
