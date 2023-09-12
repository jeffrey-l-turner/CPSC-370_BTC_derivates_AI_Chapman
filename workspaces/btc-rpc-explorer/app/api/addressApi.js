import BlockcypherAddressApiComponent from './BlockcypherAddressApiComponent';
import BlockchainAddressApiComponent from './BlockchainAddressApiComponent';

function getSupportedAddressApis() {
  return ['Blockcypher', 'Blockchain'];
}

function getCurrentAddressApiFeatureSupport() {
  return {
    pageNumbers: true,
    sortDesc: true,
    sortAsc: true,
  };
}

function getAddressDetails(address) {
  if (config.addressApi === 'blockcypher.com') {
    return <BlockcypherAddressApiComponent address={address} />;
  } else if (config.addressApi === 'blockchain.com') {
    return <BlockchainAddressApiComponent address={address} />;
  } else {
    return null;
  }
}

export default {
  getSupportedAddressApis,
  getCurrentAddressApiFeatureSupport,
  getAddressDetails,
};
