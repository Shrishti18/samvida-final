// routes/api.js
const express = require('express');
const router = express.Router();

// Your controller function
router.get('/yourApiEndpoint', (req, res) => {
  // Handle the request, e.g., fetch data from a database
  // Respond with JSON data or any other required response
  const responseData = {
    link: 'https://samvida.onrender.com',
  };
  res.json(responseData);
});

module.exports = router;
