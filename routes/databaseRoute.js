const express = require('express');
const router = express.Router();
const {
    postDatabaseData,
    getDatabaseData,
    deleteDatabaseData,
    getDataByRFID,
    updateDataByRFID,
    deleteDataByRFID,
} = require('../controllers/databaseController');

// Routes
router.post('/data', postDatabaseData);
router.get('/data', getDatabaseData);
router.delete('/data', deleteDatabaseData);

// Routes for specific RFID
router.get('/data/:rfid', getDataByRFID);
router.put('/data/:rfid', updateDataByRFID);
router.delete('/data/:rfid', deleteDataByRFID);

module.exports = router;
