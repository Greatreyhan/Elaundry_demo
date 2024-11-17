const express = require('express');
const router = express.Router();

const {
    postData,
    getData,
    deleteData,
    getDataById, deleteDataById, updateDataById
} = require('../controllers/dataController');

// Routes
router.post('/data', postData);
router.get('/data', getData);
router.delete('/data', deleteData);

// Routes for specific RFID
router.get('/data/:rfid', getDataById);
router.put('/data/:rfid', updateDataById);
router.delete('/data/:rfid', deleteDataById);

module.exports = router;
