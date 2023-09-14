import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [blockchainData, setBlockchainData] = useState(null);

  useEffect(() => {
    axios.get('https://blockchain.info/ticker')
      .then(response => {
        setBlockchainData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
  }, []);

  return (
    <div className="App">
      {blockchainData && (
        <div>
          <h1>Bitcoin Price Index</h1>
          <p>USD: {blockchainData.USD.last}</p>
        </div>
      )}
    </div>
  );
}

export default App;
