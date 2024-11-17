const { scanFileRFID } = require('../tmp/scan.js');
const { scanFileDatabase } = require('../tmp/database.js');

// Handlers
const postData = (req, res) => {
    const { id_linen, id_rfid, ruangan, jenis, status, date_last_wash, total_wash } = req.body;

    if (!id_linen || !id_rfid || !ruangan || !jenis || !status || !date_last_wash || total_wash === undefined) {
        return res.status(400).send({
            message: 'All fields (id_linen, id_rfid, ruangan, jenis, status, date_last_wash, total_wash) are required.'
        });
    }

    // Check if the RFID already exists in scanFileDatabase to prevent duplicates
    const existingData = scanFileDatabase.find(item => item.id_rfid === id_rfid);

    if (existingData) {
        return res.status(400).send({
            message: `RFID ${id_rfid} already exists in the scan data. No duplicates allowed.`,
        });
    }

    // If no duplicate, add new entry
    console.log('Received Scan Data:', { id_linen, id_rfid, ruangan, jenis, status, date_last_wash, total_wash });
    scanFileDatabase.push({ id_linen, id_rfid, ruangan, jenis, status, date_last_wash, total_wash });

    res.status(200).send({
        message: 'Add data received successfully!',
        data: { id_rfid },
    });
};

// Get Data by id_rfid
const getDataById = (req, res) => {
    const { rfid } = req.params;
    const data = scanFileDatabase.find(item => item.id_rfid === rfid);

    if (!data) {
        return res.status(404).send({
            message: `No data found for RFID ${rfid}.`,
        });
    }

    console.log('Sending Scan Data:', data);
    res.status(200).json(data);
};

const deleteData = (req, res) => {
    scanFileDatabase.length = 0; // Clear the in-memory array
    console.log('All Data Deleted.');
    res.status(200).send({ message: 'All data deleted successfully.' });
};

// Delete Data by id_rfid
const deleteDataById = (req, res) => {
    const { rfid } = req.params;
    const index = scanFileDatabase.findIndex(item => item.id_rfid === rfid);

    if (index === -1) {
        return res.status(404).send({
            message: `No data found for RFID ${rfid}.`,
        });
    }

    scanFileDatabase.splice(index, 1); // Remove the item from the array
    console.log(`Data with RFID ${rfid} deleted.`);
    res.status(200).send({ message: `Data with RFID ${rfid} deleted successfully.` });
};

// Update Data by id_rfid
const updateDataById = (req, res) => {
    const { rfid } = req.params;
    const { id_linen, ruangan, jenis, status, date_last_wash, total_wash } = req.body;

    const index = scanFileDatabase.findIndex(item => item.id_rfid === rfid);

    if (index === -1) {
        return res.status(404).send({
            message: `No data found for RFID ${rfid}.`,
        });
    }

    // Update data
    const updatedData = {
        id_linen: id_linen || scanFileDatabase[index].id_linen,
        id_rfid: rfid || scanFileDatabase[index].id_rfid,
        ruangan: ruangan || scanFileDatabase[index].ruangan,
        jenis: jenis || scanFileDatabase[index].jenis,
        status: status || scanFileDatabase[index].status,
        date_last_wash: date_last_wash || scanFileDatabase[index].date_last_wash,
        total_wash: total_wash !== undefined ? total_wash : scanFileDatabase[index].total_wash,
    };

    scanFileDatabase[index] = updatedData; // Update the item in the array

    console.log(`Data with RFID ${rfid} updated.`);
    res.status(200).send({
        message: `Data with RFID ${rfid} updated successfully.`,
        data: updatedData,
    });
};

// Optional: Get all data
const getData = (req, res) => {
    console.log('Sending All Scan Data:', scanFileDatabase);
    res.status(200).json(scanFileDatabase);
};

module.exports = { postData, getData, deleteData, getDataById, deleteDataById, updateDataById };
