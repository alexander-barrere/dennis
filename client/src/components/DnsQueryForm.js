import React, { useState } from 'react';
import axios from '../utils/api';
import styles from './DnsQueryForm.module.css';

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
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.dnsForm}>
        <label className={styles.dnsLabel}>Domain:</label>
        <input 
          type="text"
          className={styles.dnsInput}
          placeholder="Enter domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <button type="submit" className={styles.dnsButton}>
          Probe DNS
        </button>
      </form>
    </div>
  );
};

export default DnsQueryForm;
