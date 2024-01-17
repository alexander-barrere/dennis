import React from 'react';
import JsonTable from './JsonTable'; // Import the JsonTable component

const ResponseDisplay = ({ dnsResponse }) => {
  if (!dnsResponse) {
    return <p>No results to display</p>;
  }

  // If dnsResponse is not an array, convert it into one
  const dnsResponseArray = Array.isArray(dnsResponse) ? dnsResponse : [dnsResponse];

  return (
    <div>
      <JsonTable jsonData={dnsResponseArray} />
    </div>
  );
};

export default ResponseDisplay;
