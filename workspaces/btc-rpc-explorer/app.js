<<<<<<< HEAD
const React = require("react");
const { useState, useEffect } = React;
const axios = require("axios");

function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		axios
			.get("/api/data")
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div>
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
=======
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
>>>>>>> 2df37ab37eb2c0486d02bb54ecd799f71978ea65
}

export default App;
