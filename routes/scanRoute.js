const express = require('express');
const { postScanData, getScanData, deleteScanData, getFullScanData } = require('../controllers/scanController');
const router = express.Router();

router.post('/scan', postScanData);
router.get('/scan', getScanData);
router.delete('/scan', deleteScanData);
router.get('/api/fullscan', getFullScanData);

module.exports = router;
