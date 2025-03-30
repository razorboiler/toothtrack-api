const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/toothtrack'
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
