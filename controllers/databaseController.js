const { scanFileDatabase } = require('../tmp/database.js');

// Load data from the in-memory database
function loadReceivedDatabase() {
    return scanFileDatabase;
}

// Save data to the in-memory database
function saveReceivedDatabase(data) {
    scanFileDatabase.length = 0; // Clear the existing array
    scanFileDatabase.push(...data); // Push the new data
}

let receivedDatabase = loadReceivedDatabase();

// Handlers
const postDatabaseData = (req, res) => {
    const { rfid, name, room, process } = req.body;

    if (!rfid || !name || !room || !process) {
        return res.status(400).send({
            message: 'Fields rfid, name, room, and process are required.'
        });
    }

    // Check if the RFID already exists in the database
    const existingEntry = receivedDatabase.find(entry => entry.rfid === rfid);
    if (existingEntry) {
        return res.status(400).send({
            message: `Data with RFID ${rfid} already exists. RFID must be unique.`
        });
    }

    const newEntry = {
        rfid,
        name,
        room,
        process,
        timestamp: new Date().toISOString(),
    };

    console.log('Received Database Data:', newEntry);

    receivedDatabase.push(newEntry);
    saveReceivedDatabase(receivedDatabase);

    res.status(200).send({
        message: 'Database data received successfully!',
        data: newEntry,
    });
};

const getDatabaseData = (req, res) => {
    console.log('Sending Database Data:', receivedDatabase);
    res.status(200).json(receivedDatabase);
};

const deleteDatabaseData = (req, res) => {
    receivedDatabase = [];
    saveReceivedDatabase(receivedDatabase);
    console.log('All Database Data Deleted.');
    res.status(200).send({ message: 'All database data deleted successfully.' });
};

// Get data by RFID
const getDataByRFID = (req, res) => {
    const { rfid } = req.params;
    const data = receivedDatabase.find(entry => entry.rfid === rfid);

    if (!data) {
        return res.status(404).send({ message: `Data with RFID ${rfid} not found.` });
    }

    res.status(200).json(data);
};

// Update data by RFID
const updateDataByRFID = (req, res) => {
    const { rfid } = req.params;
    const { name, room, process } = req.body;

    if (!name || !room || !process) {
        return res.status(400).send({ 
            message: 'Fields name, room, and process are required to update the data.' 
        });
    }

    const index = receivedDatabase.findIndex(entry => entry.rfid === rfid);

    if (index === -1) {
        return res.status(404).send({ message: `Data with RFID ${rfid} not found.` });
    }

    receivedDatabase[index] = {
        ...receivedDatabase[index],
        name,
        room,
        process,
        timestamp: new Date().toISOString(),
    };

    saveReceivedDatabase(receivedDatabase);

    res.status(200).send({
        message: `Data with RFID ${rfid} updated successfully.`,
        data: receivedDatabase[index],
    });
};

// Delete data by RFID
const deleteDataByRFID = (req, res) => {
    const { rfid } = req.params;
    const index = receivedDatabase.findIndex(entry => entry.rfid === rfid);

    if (index === -1) {
        return res.status(404).send({ message: `Data with RFID ${rfid} not found.` });
    }

    const deletedData = receivedDatabase.splice(index, 1);
    saveReceivedDatabase(receivedDatabase);

    res.status(200).send({
        message: `Data with RFID ${rfid} deleted successfully.`,
        data: deletedData[0],
    });
};

module.exports = { 
    postDatabaseData, 
    getDatabaseData, 
    deleteDatabaseData, 
    getDataByRFID, 
    updateDataByRFID, 
    deleteDataByRFID 
};
