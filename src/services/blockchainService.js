import axios from 'axios';

const blockchainService = {
  getEvents: async () => {
    try {
      const response = await axios.get('https://blockchain.info/events');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default blockchainService;
