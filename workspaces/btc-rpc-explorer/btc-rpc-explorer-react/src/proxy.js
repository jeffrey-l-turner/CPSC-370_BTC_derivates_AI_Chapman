const axios = require('axios');

module.exports = function(req, res) {
  axios.get('https://blockchain.info/latestblock')
    .then(response => {
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          res.json(response.data);
        } else {
          res.json([response.data]);
        }
      } else {
        console.error('Error fetching data from blockchain.com API:', response.status);
        res.status(response.status).json({ error: 'Error fetching data from blockchain.com API' });
      }
    })
    .catch(error => {
      console.error('Error fetching data from blockchain.com API:', error);
      if (error.response) {
        res.status(error.response.status).json({ error: 'Error fetching data from blockchain.com API' });
      } else {
        res.status(500).json({ error: 'Error fetching data from blockchain.com API' });
      }
    });
};
