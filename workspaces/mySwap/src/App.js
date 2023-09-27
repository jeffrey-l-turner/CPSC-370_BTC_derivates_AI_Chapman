import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </body>
    </html>
  );
}

export default App;
