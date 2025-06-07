const express = require("express");
const router = express.Router();
const db = require("../db");

// ⚠️ TEMPORARY route to add visit date columns
router.get("/run-schema-update", async (req, res) => {
  try {
    await db.query(`
      ALTER TABLE patients
      ADD COLUMN last_visit DATE,
      ADD COLUMN next_appointment DATE;
    `);
    res.send("✅ Schema updated successfully.");
  } catch (err) {
    res.status(500).send("❌ ERROR: " + err.message);
  }
});

module.exports = router;
