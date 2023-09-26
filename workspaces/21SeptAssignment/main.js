// Add JavaScript code to interact with your Python backend
function viewWallet() {
    fetch('/view_wallet')
        .then(response => response.json())
        .then(data => console.log(data));
}

function makeSwap() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    fetch('/make_swap', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from_currency: fromCurrency,
            to_currency: toCurrency,
            amount: amount,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

function viewTransactions() {
    fetch('/view_transactions')
        .then(response => response.json())
        .then(data => console.log(data));
}
