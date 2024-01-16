import React, { useState } from 'react';
import DnsQueryForm from './components/DnsQueryForm';
import ResponseDisplay from './components/ResponseDisplay';
import GraphicalDisplay from './components/GraphicalDisplay';
import { Container } from 'react-bootstrap';

const App = () => {
  const [dnsResponse, setDnsResponse] = useState(null);

  return (
    <Container>
      <h1>DeNniS</h1>
      <DnsQueryForm setDnsResponse={setDnsResponse} />
      <ResponseDisplay dnsResponse={dnsResponse} />
      <GraphicalDisplay dnsResponse={dnsResponse} />
    </Container>
  );
};

export default App;
