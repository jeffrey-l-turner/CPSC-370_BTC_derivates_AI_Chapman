import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './assets/logo.png'; // Import the logo

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <img src={logo} alt="Logo" /> {/* Add the logo */}
      {data ? (
        <div>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
