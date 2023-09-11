import logo from './logo.svg';

 import React, { useState } from 'react';

 function App() {
   const [count, setCount] = useState(0);

   return (
     <div className="App">
       <header className="App-header">
         <p>Counter: {count}</p>
         <button onClick={() => setCount(count + 1)}>
           Up
         </button>
         <button onClick={() => setCount(count - 1)}>
           Down
         </button>
       </header>
     </div>
   );
 }

 export default App;
