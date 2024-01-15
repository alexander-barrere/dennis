import React from 'react';
import { Card } from 'react-bootstrap';

const ResponseDisplay = ({ dnsResponse }) => {
  return (
    <Card>
      <Card.Body>
        {dnsResponse ? (
          <div>
            <Card.Title>Results:</Card.Title>
            <pre>{JSON.stringify(dnsResponse, null, 2)}</pre>
          </div>
        ) : (
          <Card.Text>No results to display</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default ResponseDisplay;
