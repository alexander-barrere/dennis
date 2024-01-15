const PDFDocument = require('pdfkit');
const fs = require('fs');

function createPDFReport(data, outputPath) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);
    
    doc.fontSize(14).text('DNS Probe Report', { align: 'center' });
    doc.moveDown();
    
    data.forEach((record) => {
      const { domain, record_type, data, probed_at } = record;
      doc.fontSize(12).text(`Domain: ${domain}`, { underline: true });
      doc.text(`Record Type: ${record_type}`);
      doc.text(`Probed at: ${probed_at}`);
      doc.text('Data: ');
      doc.fontSize(10).text(JSON.stringify(data, null, 2), {
        width: 410,
        align: 'left',
        indent: 30
      });
      doc.moveDown();
    });

    doc.end();

    stream.on('finish', () => resolve());
    stream.on('error', reject);
  });
}

module.exports = {
  createPDFReport
};
