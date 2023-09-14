import React from 'react';
import { createTRPCClient } from '@trpc/client';
import { TRPCProvider, useQuery } from '@trpc/react';
import logo from './assets/logo.png'; // Import the logo

const client = createTRPCClient({
  url: 'http://localhost:3000/api/trpc',
});

function App() {
<<<<<<< HEAD
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
=======
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
>>>>>>> 2df37ab37eb2c0486d02bb54ecd799f71978ea65
  );
}

export default App;
