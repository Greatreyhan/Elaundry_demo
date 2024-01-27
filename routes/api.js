require('dotenv').config();
const express = require('express')
const router = express.Router()

const apiController = require('../controllers/api')

// Router GET province
router.get('/provinsi', apiController.getProvinsi);

// Router GET city by province_id
router.get('/kota/:provId', apiController.getKotaById);

// Router GET kecamatan by city_id
router.get('/kecamatan/:cityId', apiController.getKecamatanById);

// Router GET costs
router.get('/ongkos/:asal/:tujuan/:berat/:kurir', apiController.getCost)

module.exports = router