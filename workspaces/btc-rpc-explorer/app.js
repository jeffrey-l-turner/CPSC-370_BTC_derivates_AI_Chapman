import React from 'react';
import { createTRPCClient } from '@trpc/client';
import { TRPCProvider, useQuery } from '@trpc/react';
import logo from './assets/logo.png'; // Import the logo

const client = createTRPCClient({
  url: 'http://localhost:3000/api/trpc',
});

function App() {
  const dataQuery = useQuery(['data']);

  return (
    <TRPCProvider client={client}>
      <div>
        <img src={logo} alt="Logo" /> {/* Use the logo */}
        {dataQuery.data ? (
          <div>
            <h1>{dataQuery.data.title}</h1>
            <p>{dataQuery.data.description}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </TRPCProvider>
  );
}

export default App;
