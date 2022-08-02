const { appConstants } = require('../data/constants.js')

const costCalc = (spec, name, cost) => {
  let costItem = cost.filter((ele) => ele[appConstants.SPEC_TITLE] === name)[0]
  costItem = costItem[spec].toString()
  costItem = costItem.split(' ')[0]
  if (costItem === 'NA') {
    throw error
  }
  return costItem
}

module.exports = { costCalc }
