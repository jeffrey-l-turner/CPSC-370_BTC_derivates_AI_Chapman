import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://blockchain.info/latestblock')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>Latest Block</h1>
          <p>Hash: {data.hash}</p>
          <p>Time: {new Date(data.time * 1000).toLocaleString()}</p>
          <p>Block Index: {data.block_index}</p>
          <p>Height: {data.height}</p>
          <p>Size: {data.size}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
