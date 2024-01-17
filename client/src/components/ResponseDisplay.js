import React from 'react';
import JsonTable from './JsonTable'; // Import the JsonTable component

const ResponseDisplay = ({ dnsResponse }) => {
  // Check if dnsResponse has data
  if (!dnsResponse || !dnsResponse.data) {
    return <p>No results to display</p>;
  }

  // Pass the data array directly to the JsonTable component
  return (
    <div>
      {/* Render the JsonTable component with the dnsResponse data */}
      <JsonTable jsonData={dnsResponse.data} />
    </div>
  );
};

export default ResponseDisplay;
