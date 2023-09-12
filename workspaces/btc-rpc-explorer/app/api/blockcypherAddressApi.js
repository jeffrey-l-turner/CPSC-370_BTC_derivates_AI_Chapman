import BlockcypherAddressApiComponent from './BlockcypherAddressApiComponent';

function getAddressDetails(address) {
  return <BlockcypherAddressApiComponent address={address} />;
}

export default {
  getAddressDetails,
};
