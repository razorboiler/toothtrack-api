const express = require('express');
const router = express.Router(); // Router for all /api/teeth routes
const db = require('../db'); // DB access

// 🦷 Get all teeth records for a patient
router.get('/:patientId', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM teeth WHERE patient_id = $1',
    [req.params.patientId]
  );
  res.json(result.rows); // Return all teeth for that patient
});

// 🆕 Add or update a tooth status
router.post('/', async (req, res) => {
  const { patient_id, tooth_number, status } = req.body;

  // Insert new tooth OR update if it already exists
  const result = await db.query(
    `INSERT INTO teeth (patient_id, tooth_number, status)
     VALUES ($1, $2, $3)
     ON CONFLICT (patient_id, tooth_number)
     DO UPDATE SET status = $3, last_updated = CURRENT_TIMESTAMP
     RETURNING *`,
    [patient_id, tooth_number, status]
  );

  res.status(201).json(result.rows[0]); // Send back the updated tooth
});

module.exports = router;
