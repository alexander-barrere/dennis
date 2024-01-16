import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from '../utils/api';

const DnsQueryForm = ({ setDnsResponse }) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/dns/probe', { domain });
      setDnsResponse(response.data);
    } catch (error) {
      console.error(`Error: ${error}`);
      setDnsResponse(null);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Domain:</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter domain'
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Probe DNS
      </Button>
    </Form>
  );
};

export default DnsQueryForm;
