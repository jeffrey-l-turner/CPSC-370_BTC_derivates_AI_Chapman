// src/components/LatestBlocks.js

import React from 'react';
import './LatestBlocks.css';

const LatestBlocks = ({ blocks }) => (
  <div className="latest-blocks">
    <h2>Latest Blocks</h2>
    <div className="block-table">
      <div className="block-header">
        <span>HEIGHT</span>
        <span>TIME</span>
        <span>AGE</span>
        <span>TTM</span>
        <span>MINER</span>
        <span>N(TX)</span>
        <span>VOLUME</span>
        <span>FEE RATES</span>
        <span>Σ FEES</span>
        <span>% FULL</span>
      </div>
      {blocks.map((block) => (
        <div className="block-row" key={block.height}>
          <div className="block-col">{block.height}</div>
          <div className="block-col">{block.time}</div>
          <div className="block-col">{block.age}</div>
          <div className="block-col">{block.ttm}</div>
          <div className="block-col">{block.miner}</div>
          <div className="block-col">{block.ntx}</div>
          <div className="block-col">{block.volume}</div>
          <div className="block-col">{block.feeRates}</div>
          <div className="block-col">{block.fees}</div>
          <div className="block-col">{block.fullPercentage}</div>
        </div>
      ))}
    </div>
  </div>
);

export default LatestBlocks;

