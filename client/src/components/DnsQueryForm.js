import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from '../utils/api';

const DnsQueryForm = ({ setDnsResponse }) => {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/dns/probe', { domain, recordType });
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
      <Form.Group>
        <Form.Label>Record Type:</Form.Label>
        <Form.Control
          as='select'
          value={recordType}
          onChange={(e) => setRecordType(e.target.value)}
        >
          <option value='A'>A</option>
          <option value='AAAA'>AAAA</option>
          <option value='CNAME'>CNAME</option>
          <option value='MX'>MX</option>
          <option value='TXT'>TXT</option>
        </Form.Control>
      </Form.Group>
      <Button variant='primary' type='submit'>
        Probe DNS
      </Button>
    </Form>
  );
};

export default DnsQueryForm;
