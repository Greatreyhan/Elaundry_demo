const express = require('express');
const path = require('path');
const cors = require('cors');
const scanRoutes = require('./routes/scanRoute');
const databaseRoutes = require('./routes/databaseRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/api', scanRoutes);
app.use('/api', databaseRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
