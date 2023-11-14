import BlockchainAddressApiComponent from './BlockchainAddressApiComponent';

function getAddressDetails(address) {
  return <BlockchainAddressApiComponent address={address} />;
}

export default {
  getAddressDetails,
};
