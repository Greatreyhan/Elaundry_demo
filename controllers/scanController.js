const { scanFileRFID } = require('../tmp/scan.js');
const { scanFileDatabase } = require('../tmp/database.js');

// Handlers
const postScanData = (req, res) => {
    const { rfid } = req.body;

    if (!rfid) {
        return res.status(400).send({ 
            message: 'RFID is required.' 
        });
    }

    // Check if the RFID already exists in scanFileRFID to prevent duplicates
    const existingData = scanFileRFID.find(item => item.rfid === rfid);

    if (existingData) {
        return res.status(400).send({
            message: `RFID ${rfid} already exists in the scan data. No duplicates allowed.`,
        });
    }

    // If no duplicate, add new entry with only the RFID
    console.log('Received Scan Data:', { rfid });
    scanFileRFID.push({ rfid });

    res.status(200).send({ 
        message: 'Scan data received successfully!',
        data: { rfid },
    });
};

const postMultipleScanData = (req, res) => {
    const { rfids } = req.body;

    if (!Array.isArray(rfids)) {
        return res.status(400).send({ 
            message: 'The body must contain an array of RFID values.' 
        });
    }

    if (rfids.length === 0) {
        return res.status(400).send({ 
            message: 'No RFID data provided.' 
        });
    }

    const addedRFIDs = [];
    const alreadyExistsRFIDs = [];

    rfids.forEach(rfid => {
        if (!rfid) return;

        // Check if the RFID already exists
        const existingData = scanFileRFID.find(item => item.rfid === rfid);

        if (existingData) {
            alreadyExistsRFIDs.push(rfid);
        } else {
            // If no duplicate, add new RFID
            scanFileRFID.push({ rfid });
            addedRFIDs.push(rfid);
        }
    });

    // Response
    res.status(200).send({
        message: 'Scan data processed successfully!',
        added: addedRFIDs,
        alreadyExists: alreadyExistsRFIDs,
    });
};

const getScanData = (req, res) => {
    console.log('Sending Scan Data:', scanFileRFID);
    res.status(200).json(scanFileRFID);
};

const deleteScanData = (req, res) => {
    scanFileRFID.length = 0; // Clear the in-memory array
    console.log('All Scan Data Deleted.');
    res.status(200).send({ message: 'All scan data deleted successfully.' });
};

const getFullScanData = (req, res) => {
    const found = [];
    const notFound = [];

    // Loop through each RFID in scanFileRFID to check against scanFileDatabase
    scanFileRFID.forEach(scanItem => {
        const matchingItem = scanFileDatabase.find(entry => entry.rfid === scanItem.rfid);
        
        if (matchingItem) {
            // If found, push to found array
            found.push(matchingItem);
        } else {
            // If not found, push to notFound array
            notFound.push(scanItem);
        }
    });

    // Return both found and not found data
    res.status(200).json({ found, notFound });
};

module.exports = { postScanData, getScanData, deleteScanData, getFullScanData, postMultipleScanData };
