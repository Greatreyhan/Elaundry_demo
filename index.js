const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()

// Store the incoming data (for demonstration, use an in-memory array)
let receivedData = [];

// Router
const apiRouter = require('./routes/api')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Definisikan Router pada path "/api"
app.use('/api', apiRouter)

// Middleware to log POST data (for example purposes)
app.post('/api/data', (req, res) => {
    const incomingData = req.body;
    console.log('Received Data:', incomingData); // Log incoming data
    receivedData.push(incomingData); // Store it in memory (you can replace this with a database)
    res.status(200).send({ message: 'Data received successfully!' });
});

// A GET route to print the stored data
app.get('/api/data', (req, res) => {
    console.log('Sending stored data:', receivedData); // Log the stored data
    res.status(200).json(receivedData); // Return the stored data as JSON
});

// DELETE route to clear all stored data
app.delete('/api/data', (req, res) => {
    receivedData = []; // Clear all data
    console.log('All data deleted.');
    res.status(200).send({ message: 'All data deleted successfully.' });
});

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
