// src/App.js
import React, { useState, useEffect } from 'react';
import LatestBlocks from './components/LatestBlocks';
import './App.css';

function App() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://blockchain.info/blocks?format=json');
        const data = await response.json();
        //setBlocks(data.blocks); // Adjust this line based on the API's response structure
      } catch (error) {
        console.error('Error fetching blocks:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <LatestBlocks blocks={blocks} />
    </div>
  );
}

export default App;

