import React, { useState } from 'react';

const App: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setMessage('You clicked the button in 12OctAssignment!');
  }

  return (
    <div>
      <h1>Welcome to our simple interface!</h1>
      <button onClick={handleClick}>Click me</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
