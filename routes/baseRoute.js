const express = require('express');
const router = express.Router();

// GET handler for the base route
router.get('/', (req, res) => {
    res.send('DNS_Probe server is running!');
});

module.exports = router;