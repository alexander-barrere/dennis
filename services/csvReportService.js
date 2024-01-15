const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');

async function createCSVReport(data, outputPath) {
  const records = data.map(record => ({
    domain: record.domain,
    record_type: record.record_type,
    data: JSON.stringify(record.data),
    probed_at: record.probed_at
  }));

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: [
      { id: 'domain', title: 'DOMAIN' },
      { id: 'record_type', title: 'RECORD TYPE' },
      { id: 'data', title: 'DATA' },
      { id: 'probed_at', title: 'PROBED AT' }
    ],
    append: false
  });

  await csvWriter.writeRecords(records);
}

module.exports = {
  createCSVReport
};
