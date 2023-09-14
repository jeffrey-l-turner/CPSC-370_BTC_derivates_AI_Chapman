fetch('https://blockchain.info/ticker')
  .then(response => response.json())
  .then(data => {
    document.getElementById('price').textContent = 'USD: ' + data.USD.last;
  })
  .catch(error => console.error('Error:', error));
