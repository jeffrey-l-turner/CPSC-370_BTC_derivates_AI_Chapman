fetch('https://blockchain.info/ticker')
  .then(response => response.json())
  .then(data => {
    document.getElementById('price').textContent = 'USD: ' + data.USD.last;
  })
  .catch(error => console.error('Error:', error));

function getBalanceSummary(address) {
  fetch(`https://blockchain.info/balance?active=${address}`)
    .then(response => response.json())
    .then(data => {
      console.log(`Balance for ${address}: ${data[address].final_balance}`);
    })
    .catch(error => console.error('Error:', error));
}
