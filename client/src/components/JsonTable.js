import React from 'react';
import styles from './JsonTable.module.css';

const JsonTable = ({ jsonData }) => {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
        return <p>No data available</p>;
    }

    const renderValue = (value) => {
        // Log the value to see exactly what's being passed in
        console.log('Rendering value:', value);
    
        // Handle nested objects, such as the MX record values
        if (Array.isArray(value) && value.some(v => v?.exchange)) {
            // When value is an array of MX records, format each MX record
            return value.map((mx, idx) => (
                <div key={idx} className={styles.subTable}>
                    {`Exchange: ${mx.exchange}, Priority: ${mx.priority}`}
                </div>
            ));
        }
        // Handle arrays of strings, such as A, AAAA, and TXT record values
        else if (Array.isArray(value)) {
            // If the array contains strings, join them, otherwise JSON stringify
            return value.every(item => typeof item === 'string')
                ? value.join(', ')
                : JSON.stringify(value, null, 2);
        }
        // Handle strings directly
        else if (typeof value === 'string') {
            return value;
        }
        // Handle anything else (which shouldn't normally happen)
        else {
            return JSON.stringify(value, null, 2);
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
                        <td className={styles.td}>
                            {record.Error ? record.Error : renderValue(record.Values)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default JsonTable;
