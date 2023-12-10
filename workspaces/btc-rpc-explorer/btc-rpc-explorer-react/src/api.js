// src/api.js
import axios from 'axios';

const BASE_URL = "https://blockchain.info/";

export const fetchMarketData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}ticker`);
        return response.data;
    } catch (error) {
        console.error("Error fetching market data:", error);
    }
};

// Add more API functions as needed

