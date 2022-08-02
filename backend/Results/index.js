const calculation = require('./functions/categoryCostCalculation');
const aggregateCalculation = require('./functions/aggregateCostCalculation');
const priceTable = require('./data/priceTable.json');
const commonCalculations = require('./functions/commonCalculation');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const request = {
    firmName: req.body.firmName,
    userCount: +req.body.userCount,
    needlesVersion: req.body.needlesVersion,
    documentManagement: req.body.documentManagement,
    onPremCostPerUser: +req.body.onPremCostPerUser,
    cloudCostPerUser: +req.body.cloudCostPerUser,
    newHardwarePurchased: req.body.newHardwarePurchased,
  };

  // console.log('**REQUEST**: ', request);

  // const costPerUser =
  //   request.needlesVersion === 'Needles 4'
  //     ? priceTable.price[req.body.userCount - 1]
  //     : priceTable.OnPremCostPerUser;

  const response = {
    aggregateCategoryCost: {
      onCloud: {
        ITAdmin: calculation.calculateITAdmin('CLOUD', request.userCount),
        needles: calculation.calculateNeedles(
          'CLOUD',
          request.userCount,
          request.cloudCostPerUser,
          request.documentManagement
        ),
        infrastructure: calculation.calculateInfrastructure(
          'CLOUD',
          request.userCount,
          request.newHardwarePurchased
        ),
        implementation: commonCalculations.calculateImplementation(
          'CLOUD',
          request.needlesVersion,
          request.documentManagement,
          request.userCount
        ),
      },
      onPrem: {
        ITAdmin: calculation.calculateITAdmin('ON_PREM', request.userCount),
        needles: calculation.calculateNeedles(
          'ON_PREM',
          request.userCount,
          request.onPremCostPerUser,
          request.documentManagement
        ),
        infrastructure: calculation.calculateInfrastructure(
          'ON_PREM',
          request.userCount,
          request.newHardwarePurchased
        ),
        implementation: commonCalculations.calculateImplementation(
          'ON_PREM',
          request.needlesVersion,
          request.documentManagement,
          request.userCount
        ),
      },
    },
    aggregateAnnualCost: {
      onPrem: aggregateCalculation.calculateAggregateCost(
        'ON_PREM',
        request.userCount,
        request.onPremCostPerUser,
        request.newHardwarePurchased,
        request.documentManagement,
        request.needlesVersion
      ),
      onCloud: aggregateCalculation.calculateAggregateCost(
        'CLOUD',
        request.userCount,
        request.cloudCostPerUser,
        request.newHardwarePurchased,
        request.documentManagement,
        request.needlesVersion
      ),
    },
    firmName: request.firmName,
  };

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: response,
  };
};
