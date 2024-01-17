import React from 'react';
import styles from './JsonTable.module.css';

const JsonTable = ({ jsonData }) => {
    // Ensure jsonData is an array
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
        return <p>No data available</p>;
    }

    // Helper function to render record values
    const renderValue = (record) => {
        if (record.Error) {
            return record.Error;
        }

        if (record.Values) {
            // Check if the record.Values is an array of arrays for TXT records
            if (record.Type === 'TXT') {
                return record.Values.map((txtArray) => txtArray.join('')).join(', ');
            }
            // Check if the record.Values is an array of objects for MX records
            else if (record.Type === 'MX') {
                return record.Values.map((mx) => `${mx.exchange} (Priority: ${mx.priority})`).join(', ');
            }
            // For other record types like A, AAAA, NS
            return record.Values.join(', ');
        }
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {jsonData.map((record, index) => (
                    <tr key={index}>
                        <td>{record.Type}</td>
                        <td>{renderValue(record)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default JsonTable;
