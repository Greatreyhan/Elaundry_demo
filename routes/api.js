const express = require('express')
const router = express.Router()

const apiController = require('../controllers/api')

router.get('/test', apiController.getTest);

// Post Test
router.post('/test', apiController.postTest);


module.exports = router