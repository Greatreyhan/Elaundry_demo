const express = require('express');
const { postScanData, getScanData, deleteScanData, getFullScanData, postMultipleScanData } = require('../controllers/scanController');
const router = express.Router();

router.post('/scan', postScanData);
router.post('/scan/multi', postMultipleScanData);
router.get('/scan', getScanData);
router.delete('/scan', deleteScanData);
router.get('/api/fullscan', getFullScanData);

module.exports = router;
