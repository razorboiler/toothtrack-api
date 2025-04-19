const express = require('express');
const router = express.Router(); // Router for all /api/teeth routes
const db = require('../db'); // DB access

// 🦷 Get all teeth records for a patient
router.get('/:patientId', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM teeth WHERE patient_id = $1',
      [req.params.patientId]
    );
    res.json(result.rows); // Return all teeth for that patient
  } catch (err) {
    console.error('Error fetching teeth:', err);
    res.status(500).json({ error: 'Failed to fetch teeth data' });
  }
});

// 🛠️ Add or update a tooth status
router.post('/', async (req, res) => {
  const { patient_id, tooth_number, status } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO teeth (patient_id, tooth_number, status)
       VALUES ($1, $2, $3)
       ON CONFLICT (patient_id, tooth_number)
       DO UPDATE SET status = $3, last_updated = CURRENT_TIMESTAMP
       RETURNING *`,
      [patient_id, tooth_number, status]
    );

    res.status(201).json(result.rows[0]); // Send back the updated tooth
  } catch (err) {
    console.error('Error updating tooth:', err);
    res.status(500).json({ error: 'Failed to update tooth status' });
  }
});

// ✏️ Update tooth status for a patient
router.put('/:patientId/:toothNumber', async (req, res) => {
  const { patientId, toothNumber } = req.params;
  const { status } = req.body;

  const result = await db.query(
    `UPDATE teeth
     SET status = $1, last_updated = CURRENT_TIMESTAMP
     WHERE patient_id = $2 AND tooth_number = $3
     RETURNING *`,
    [status, patientId, toothNumber]
  );

  res.json(result.rows[0]);
});

module.exports = router;
