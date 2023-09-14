import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getPrice = async () => {
      const response = await axios.get('https://blockchain.info/ticker');
      setPrice(response.data.USD.last);
    };

    getPrice();
  }, []);

  return (
    <div>
      {price ? `The current price of Bitcoin is $${price}` : 'Loading...'}
    </div>
  );
}

export default App;
