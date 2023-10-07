const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes
const configRoutes = require('./routes');

configRoutes(app);


app.listen(5000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:5000');
  console.log();
});