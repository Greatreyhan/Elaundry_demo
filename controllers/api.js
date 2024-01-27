require('dotenv').config();
const express = require('express')
const axios = require('axios')

// Config Defaults Axios dengan Detail Akun Rajaongkir
axios.defaults.baseURL = process.env.URL
axios.defaults.headers.common['key'] = process.env.API_KEY
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const getProvinsi = (req, res) => {
    axios.get('/province')
      .then(response => res.json(response.data))
      .catch(err => res.send(err))
  }

const getKotaById = (req, res) => {
    const id = req.params.provId
    axios.get(`/city?province=${id}`)
      .then(response => res.json(response.data))
      .catch(err => res.send(err))
  }

const getKecamatanById = (req,res) => {
    const id = req.params.cityId
      axios.get(`/subdisctrict/${id}`)
        .then(response=> res.json((response.data)))
        .catch(err=>res.semd(err))
  }

const getCost = (req, res) => {
    const param = req.params
    axios.post('/cost', {
        origin: param.asal,
        destination: param.tujuan,
        weight: param.berat,
        courier: param.kurir
      })
      .then(response => res.json(response.data))
      .catch(err => res.send(err))
  }

module.exports={
    getProvinsi,
    getKotaById,
    getKecamatanById,
    getCost
}