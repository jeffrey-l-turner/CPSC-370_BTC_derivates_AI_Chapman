// This is where we will write our JavaScript code to interact with the blockchain.com API
console.log('app.js loaded');

// Fetch data from the blockchain.com API
fetch('https://blockchain.info/ticker')
  .then(response => response.json())
  .then(data => {
    // Log the data to the console for now
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
