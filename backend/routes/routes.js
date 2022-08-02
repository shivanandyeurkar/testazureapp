const express = require('express')
const router = express.Router()
const { appConstants } = require('../data/constants.js')
const { costCalc } = require('../functions/calcFetch')
const checkAuthenticated = require('../utils/authValidation')
const getCost = require('../utils/getCost')


router.get('/data', checkAuthenticated, async (req, res) => {
  try {
    const regions = require('../data/regions.json')
    const jobSpecs = require('../data/jobSpecs.json')
    let specData = []
    let cost = await getCost()
    jobSpecs.forEach((element) => {
      const productList = cost
        .filter((ele) => ele[element] != appConstants.NOT_ASSIGNED)
        .map((ele) => ele[appConstants.SPEC_TITLE])
      specData.push({ name: element, validProducts: productList })
    })
    const types = require('../data/types.json')
    const data = {
      regions: regions,
      jobSpecs: specData,
      types: types
    }
    res.status(200).send(data)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: appConstants.ERROR_INTERNALSERVER })
  }
})

router.post('/calculate', checkAuthenticated, async (req, res) => {
  try {
    if (!req.body.products) {
      res.status(400).send({ message: appConstants.ERROR_BADREQUEST })
    } else {
      let data = { totalCost: 0, products: [] }
      let priceList = await getCost()
      req.body.products.forEach((ele) => {
        ele.cost = ele.count * costCalc(req.body.spec, ele.name, priceList)
        data.products.push({ name: ele.name, cost: ele.cost })
        data.totalCost += ele.cost
      })
      res.status(200).send({ data })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: appConstants.ERROR_INTERNALSERVER })
  }
})

module.exports = router
