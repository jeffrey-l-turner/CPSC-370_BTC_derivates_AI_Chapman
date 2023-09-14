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
  const addresses = document.getElementById('address').value.split('|');
  for (let i = 0; i < addresses.length; i++) {
    if (!isValidAddress(addresses[i])) {
      document.getElementById('balance').textContent = 'Invalid Bitcoin address.';
      return;
    }
  }
  fetch(`https://blockchain.info/balance?active=${addresses.join('|')}`)
    .then(response => response.json())
    .then(data => {
      let balanceText = '';
      for (let i = 0; i < addresses.length; i++) {
        balanceText += `Balance for ${addresses[i]}: ${data[addresses[i]].final_balance}\n`;
      }
      document.getElementById('balance').textContent = balanceText;
    })
    .catch(error => console.error('Error:', error));
}

function getLatestBlock() {
  fetch('https://blockchain.info/latestblock')
    .then(response => response.json())
    .then(data => {
      document.getElementById('latestBlock').textContent = `Latest Block: ${data.hash}\nTime: ${new Date(data.time * 1000)}\nBlock Index: ${data.block_index}\nHeight: ${data.height}\nTransaction Indexes: ${data.txIndexes.join(', ')}`;
    })
    .catch(error => console.error('Error:', error));
}

// Call the getLatestBlock function when the page loads
getLatestBlock();
