// Import the Express web framework so we can create our server
const express = require('express');
const app = express(); // Create an instance of the Express app

// Use port 3000 unless a different one is specified in the hosting environment
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
// (So when someone sends data like { name: "Bob" }, we can read it)
app.use(express.json());

// 💡 Define our API routes by connecting them to their files in the /routes folder

// For anything that starts with /api/users, use the code in routes/users.js
app.use('/api/users', require('./routes/users'));

// Same for patients, teeth, x-rays, recommendations, appointments
app.use('/api/patients', require('./routes/patients'));
app.use('/api/teeth', require('./routes/teeth'));
app.use('/api/xrays', require('./routes/xrays'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/appointments', require('./routes/appointments'));

// Start the server and listen for requests on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
