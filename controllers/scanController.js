const path = require('path');
const fs = require('fs');

// Path to scan.json and database.json
const scanFileRFID = path.join(__dirname, '../scan.json');
const scanFileDatabase = path.join(__dirname, '../database.json');

// Load data from scan.json (RFID data from scanning)
function loadScanData() {
    if (fs.existsSync(scanFileRFID)) {
        const rawData = fs.readFileSync(scanFileRFID);
        return JSON.parse(rawData);
    }
    return [];
}

// Load data from database.json (Stored database entries)
function loadReceivedDatabase() {
    if (fs.existsSync(scanFileDatabase)) {
        const rawData = fs.readFileSync(scanFileDatabase);
        return JSON.parse(rawData);
    }
    return [];
}

// Save data to scan.json
function saveReceivedRFID(data) {
    fs.writeFileSync(scanFileRFID, JSON.stringify(data, null, 2));
}

// Save data to database.json
function saveReceivedDatabase(data) {
    fs.writeFileSync(scanFileDatabase, JSON.stringify(data, null, 2));
}

// Load initial data from scan.json and database.json
let receivedRFID = loadScanData();
let receivedDatabase = loadReceivedDatabase();

// Handlers
const postScanData = (req, res) => {
    const incomingData = req.body;
    console.log('Received Scan Data:', incomingData);
    receivedRFID.push(incomingData);
    saveReceivedRFID(receivedRFID);
    res.status(200).send({ message: 'Scan data received successfully!' });
};

const getScanData = (req, res) => {
    console.log('Sending Scan Data:', receivedRFID);
    res.status(200).json(receivedRFID);
};

const deleteScanData = (req, res) => {
    receivedRFID = [];
    saveReceivedRFID(receivedRFID);
    console.log('All Scan Data Deleted.');
    res.status(200).send({ message: 'All scan data deleted successfully.' });
};

// New function to get full scan data from scan.json and match it with database.json
const getFullScanData = (req, res) => {
    const scanData = loadScanData(); // Load scan data from scan.json
    const databaseData = loadReceivedDatabase(); // Load database entries from database.json

    const found = [];
    const notFound = [];

    // Loop through each RFID in scan.json to check against database.json
    scanData.forEach(scanItem => {
        const matchingItem = databaseData.find(entry => entry.rfid === scanItem.rfid);
        
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

module.exports = { postScanData, getScanData, deleteScanData, getFullScanData };
