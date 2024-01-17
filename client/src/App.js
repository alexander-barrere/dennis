import React, { useState } from 'react';
import DnsQueryForm from './components/DnsQueryForm';
import ResponseDisplay from './components/ResponseDisplay';
import GraphicalDisplay from './components/GraphicalDisplay';
import { Container } from 'react-bootstrap';
import './App.css';

const App = () => {
  const [dnsResponse, setDnsResponse] = useState(null);

  return (
    <Container>
      <div className="header">
        <img src="/img/dennis.png" alt="DeNniS logo" className="logo" />
        <h1>DeNniS</h1>
      </div>
      <DnsQueryForm setDnsResponse={setDnsResponse} />
      <ResponseDisplay dnsResponse={dnsResponse} />
      <GraphicalDisplay dnsResponse={dnsResponse} />
    </Container>
  );
};

export default App;
