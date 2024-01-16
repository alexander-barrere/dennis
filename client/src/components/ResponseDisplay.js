import React from 'react';
import styles from './ResponseDisplay.module.css'; // Assuming you'll create this CSS module

const ResponseDisplay = ({ dnsResponse }) => {
  return (
    <div className={styles.responseContainer}>
      <div className={styles.responseCard}>
        {dnsResponse ? (
          <div>
            <h5 className={styles.responseTitle}>Results:</h5>
            <pre className={styles.responseText}>{JSON.stringify(dnsResponse, null, 2)}</pre>
          </div>
        ) : (
          <p className={styles.noResultsText}>No results to display</p>
        )}
      </div>
    </div>
  );
};

export default ResponseDisplay;
