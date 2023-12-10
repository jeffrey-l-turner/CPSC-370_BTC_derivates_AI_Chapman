const express = require('express');
const cors = require('cors');
const proxy = require('./src/proxy');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use('/proxy/blocks', proxy);

app.get('/', (req, res) => {
  res.send('Server is running. Use /proxy for the proxy service.');
});

app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
