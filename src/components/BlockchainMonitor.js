import React, { useEffect, useState } from 'react';
import blockchainService from '../services/blockchainService';

function BlockchainMonitor() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const result = await blockchainService.getEvents();
      setEvents(result);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {events.map((event, index) => (
        <div key={index}>
          <p>{event}</p>
        </div>
      ))}
    </div>
  );
}

export default BlockchainMonitor;
