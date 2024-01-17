// App.js
import React, { useState } from 'react';
import DnsQueryForm from './components/DnsQueryForm';
import ResponseDisplay from './components/ResponseDisplay';
import GraphicalDisplay from './components/GraphicalDisplay';
import { Container } from 'react-bootstrap';
import './App.css'; // Make sure your CSS file is correctly imported

const App = () => {
  const [dnsResponse, setDnsResponse] = useState(null);

  return (
    <Container>
      <div className="header">
        <img src="/img/dennis.png" alt="DeNniS logo" className="logo" />
        <h1>
          The <span className="colorize">D</span>.e<span className="colorize">N</span>.ni<span className="colorize">S</span>. System
        </h1>
      </div>
      <DnsQueryForm setDnsResponse={setDnsResponse} />
      <ResponseDisplay dnsResponse={dnsResponse} />
      <GraphicalDisplay dnsResponse={dnsResponse} />
    </Container>
  );
};

export default App;
