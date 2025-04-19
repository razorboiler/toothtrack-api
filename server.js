// Import the Express web framework and CORS
const express = require("express");
const cors = require("cors"); // ✅ ADD THIS LINE
const app = express();

// Use port 3000 unless a different one is specified in the hosting environment
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors()); // ✅ ADD THIS LINE

// Middleware to parse incoming JSON requests
app.use(express.json());

// 🔁 Define our API routes by connecting them to their files in the /routes folder
app.use('/api/users', require('./routes/users'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/teeth', require('./routes/teeth'));
app.use('/api/xrays', require('./routes/xrays'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/appointments', require('./routes/appointments'));

// Start the server and listen for requests on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
