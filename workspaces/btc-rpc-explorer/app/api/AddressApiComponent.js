import React, { useState, useEffect } from 'react';

function AddressApiComponent() {
  const [addressDetails, setAddressDetails] = useState(null);

  useEffect(() => {
    fetch('https://blockchain.info/rawaddr/$bitcoin_address')
      .then(response => response.json())
      .then(data => setAddressDetails(data));
  }, []);

  return (
    <div>
      {addressDetails && (
        <div>
          <h2>Address Details</h2>
          <p>{JSON.stringify(addressDetails)}</p>
        </div>
      )}
    </div>
  );
}

export default AddressApiComponent;
