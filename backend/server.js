
require('dotenv').config();
const express = require('express');


// express app setup
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.json({greeting: 'Hello Sana!'});
});

// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running at http://localhost:' + (process.env.PORT || 4000));
});