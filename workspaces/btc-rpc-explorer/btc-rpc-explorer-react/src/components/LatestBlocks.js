// src/components/LatestBlocks.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LatestBlocks.css';

const LatestBlocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/proxy/blocks')
      .then(response => {
        if (response.data.error) {
          setError(response.data.error);
        } else if (response.data && Array.isArray(response.data)) {
          setBlocks(response.data);
        } else {
          console.error('Unexpected data:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data from blockchain.com API:', error);
        setError(error.response.data.error);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(blocks)) {
    console.error('Unexpected data:', blocks);
    return null;
  }

  return (
    <div className="latest-blocks">
      <h2>Latest Blocks</h2>
      <div className="block-table">
        <div className="block-header">
          <span>INDEX</span>
          <span>HASH</span>
          <span>HEIGHT</span>
          <span>TIME</span>
          <span>MINER</span>
          <span>TX COUNT</span>
          <span>% FULL</span>
        </div>
        {blocks.map((block) => (
          <div className="block-row" key={block.height}>
            <div className="block-col index">{block.block_index}</div>
            <div className="block-col hash" title={block.hash}>{block.hash.substring(0, 10)}...</div>
            <div className="block-col height">{block.height}</div>
            <div className="block-col time">{new Date(block.time * 1000).toLocaleString()}</div>
            <div className="block-col miner">{block.n_tx}</div>
            <div className="block-col tx-count">{block.txIndexes.length}</div>
            <div className="block-col full">{block.main_chain ? 'Yes' : 'No'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestBlocks;
