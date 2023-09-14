fetch('https://blockchain.info/ticker')
  .then(response => response.json())
  .then(data => {
    document.getElementById('price').textContent = 'USD: ' + data.USD.last;
  })
  .catch(error => console.error('Error:', error));

function isValidAddress(address) {
  // Bitcoin addresses are 26-35 characters long, consist of alphabetic and numeric characters, 
  // start with either a 1 or a 3, and never use 0, O, l and I to avoid visual ambiguity.
  // This is a simple validation and does not cover all cases.
  const regex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
  return regex.test(address);
}

function getBalanceSummary() {
  const address = document.getElementById('address').value;
  if (!isValidAddress(address)) {
    document.getElementById('balance').textContent = 'Invalid Bitcoin address.';
    return;
  }
  fetch(`https://blockchain.info/balance?active=${address}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('balance').textContent = `Balance for ${address}: ${data[address].final_balance}`;
    })
    .catch(error => console.error('Error:', error));
}
