const express = require('express')
const axios = require('axios')

// Config Defaults Axios dengan Detail Akun Rajaongkir
axios.defaults.baseURL = process.env.URL
axios.defaults.headers.common['key'] = process.env.API_KEY
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const postTest = (req, res) => {
    console.log(req.body)
    res.json({
      msg: "OK"
    })
  }

const getTest = (req, res) => {
  console.log("Get OK")
    res.json({
      msg: "OK"
    })
  }

module.exports={
  postTest,
  getTest
}