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
      axios.get(`/subdistrict?city=${id}`)
        .then(response=> res.json((response.data)))
        .catch(err=>console.log(err))
  }

const getCost = (req, res) => {
    console.log(req.body)
    const {origin, originType, destination, destinationType, weight, courier} = req.body;
    axios.post('/cost', {
        origin: origin,
        originType: originType,
        destination: destination,
        destinationType : destinationType,
        weight: weight,
        courier: courier
      })
      .then(response => res.json(response.data))
      .catch(err => res.send(err))
  }

const getCurrentPosition = (req,res) =>{
    const courier = req.params.courier
    const resi = req.params.resi
    axios.post('/waybill',{
      waybill : resi,
      courier : courier 
    })
    .then(response => res.json(response.data))
    .catch(err => res.send(err))
}

module.exports={
    getProvinsi,
    getKotaById,
    getKecamatanById,
    getCost,
    getCurrentPosition
}