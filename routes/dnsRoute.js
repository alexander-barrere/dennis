const express = require('express');
const router = express.Router();
const { initModels } = require('../models');
const dnsProbeService = require('../services/dnsProbeService');
const pdfReportService = require('../services/pdfReportService');
const csvReportService = require('../services/csvReportService');
const path = require('path');
const fs = require('fs');

const models = initModels(require('../database/sequelize'));

router.post('/probe', async (req, res) => {
    const { domain, recordType, protocol, dnssec } = req.body;

    try {
        let response;
        if (dnssec) {
            response = await dnsProbeService.queryDNSWithDNSSEC(domain, recordType, protocol);
        } else {
            response = protocol === 'UDP' ?
                await dnsProbeService.queryDNSOverUDP(domain, recordType) :
                await dnsProbeService.queryDNSOverTCP(domain, recordType);
        }
        await models.ProbeRecord.create({
            domain: domain,
            record_type: recordType,
            data: response.answers
        });

        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/report/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const probeResults = await models.ProbeRecord.findAll();
        const fileName = `dns_probe_report_${Date.now()}`;

        if (type === 'pdf') {
            const outputPath = path.join(__dirname, `../reports/${fileName}.pdf`);
            await pdfReportService.createPDFReport(probeResults, outputPath);
            res.download(outputPath, err => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    fs.unlink(outputPath, err => err && console.error(err));
                }
            });
        } else if (type === 'csv') {
            const outputPath = path.join(__dirname, `../reports/${fileName}.csv`);
            await csvReportService.createCSVReport(probeResults, outputPath);
            res.download(outputPath, err => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    fs.unlink(outputPath, err => err && console.error(err));
                }
            });
        } else {
            res.status(400).send('Invalid report type. Supported types are: pdf, csv');
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
