const express = require('express');
const router = express.Router(); // Router for /api/xrays
const db = require('../db'); // DB helper

// 📸 Get all x-rays for a patient
router.get('/:patientId', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM xrays WHERE patient_id = $1',
    [req.params.patientId]
  );
  res.json(result.rows); // Return all x-rays for that patient
});

// 🆕 Upload a new x-ray record
router.post('/', async (req, res) => {
  const { patient_id, file_url, description } = req.body;

  const result = await db.query(
    `INSERT INTO xrays (patient_id, file_url, description)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [patient_id, file_url, description]
  );

  res.status(201).json(result.rows[0]); // Return the new x-ray
});

module.exports = router;
