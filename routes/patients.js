const express = require('express');
const router = express.Router(); // Create a mini Express app (just for routes)
const db = require('../db'); // Our database helper

// 🏥 Get all patients in a specific clinic
router.get('/clinic/:clinicId', async (req, res) => {
  const { clinicId } = req.params;
  const result = await db.query(
    'SELECT * FROM patients WHERE clinic_id = $1',
    [clinicId]
  );
  res.json(result.rows);
});

// 👤 Get one patient by their ID
router.get('/:id', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM patients WHERE id = $1',
    [req.params.id]
  );
  res.json(result.rows[0]);
});

// ➕ Create a new patient entry
router.post('/', async (req, res) => {
  const { user_id, clinic_id, dob, notes, allergies } = req.body;
  const result = await db.query(
    `INSERT INTO patients (user_id, clinic_id, dob, notes, allergies)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [user_id, clinic_id, dob, notes, allergies]
  );
  res.status(201).json(result.rows[0]);
});

// 📝 Update notes, treatment, and visit dates for a patient
router.put('/:id', async (req, res) => {
  const { notes, treatment_status, last_visit, next_appointment } = req.body;

  try {
    const result = await db.query(
      `UPDATE patients
       SET notes = $1,
           treatment_status = $2,
           last_visit = $3,
           next_appointment = $4
       WHERE id = $5
       RETURNING *`,
      [notes, treatment_status, last_visit, next_appointment, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating patient:', err);
    res.status(500).json({ error: 'Failed to update patient' });
  }
});

module.exports = router;
