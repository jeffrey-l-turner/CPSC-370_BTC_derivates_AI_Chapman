import React, { useState, useEffect } from 'react';

function BlockcypherAddressApiComponent({address}) {
  const [addressDetails, setAddressDetails] = useState(null);

  useEffect(() => {
    fetch(`https://blockchain.info/rawaddr/${address}`)
      .then(response => response.json())
      .then(data => setAddressDetails(data));
  }, [address]);

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

export default BlockcypherAddressApiComponent;
