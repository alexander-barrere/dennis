import React from 'react';
import styles from './JsonTable.module.css';

const JsonTable = ({ jsonData }) => {
    if (!jsonData) {
        return <p>No data available</p>;
    }

    const renderValue = (value) => {
        if (Array.isArray(value)) {
            return value.map((item, idx) =>
                typeof item === 'object' ? (
                    <div key={idx} className={styles.subTable}>
                        {Object.entries(item).map(([key, val], index) => (
                            <div key={index}>
                                <strong>{key}:</strong> {val.toString()}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div key={idx}>{item}</div>
                )
            );
        } else if (value && typeof value === 'object') {
            return JSON.stringify(value, null, 2);
        } else {
            return value;
        }
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {Object.keys(jsonData).map((key, index) => (
                        <th key={index} className={styles.th}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {Object.values(jsonData).map((value, index) => (
                        <td key={index} className={styles.td}>
                            {renderValue(value)}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};

export default JsonTable;
