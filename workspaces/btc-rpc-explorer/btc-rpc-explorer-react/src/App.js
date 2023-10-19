// src/App.js

import React from 'react';
import './App.css';
import LatestBlocks from './components/LatestBlocks';

function App() {
    return (
        <div className="app">
            <div className="container">
                <LatestBlocks />
            </div>
        </div>
    );
}

export default App;
