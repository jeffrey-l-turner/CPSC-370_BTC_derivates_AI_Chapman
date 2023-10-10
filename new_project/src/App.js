import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../public/chapman_panther.png'; // Corrected path

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
      <img src={logo} className="App-logo" alt="logo" /> {/* Use the new image */}
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
