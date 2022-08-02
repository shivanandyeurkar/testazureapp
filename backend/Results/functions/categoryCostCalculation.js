const needlesCost = require('../data/needlesCost.json');
const ITAdminCost = require('../data/ITAdminCost.json');
const commonCalculations = require('../functions/commonCalculation');
const miscellaneousCalculations = require('./miscellaneousCalculations');
const constants = require('../constants');

const calculateNeedles = (
  hostingLocation,
  userCount,
  costPerUser,
  documentManagement
) => {
  if (hostingLocation === constants.ON_PREM) {
    var appSubscriptionFee = miscellaneousCalculations.getAppSubscriptionFee(
      userCount,
      costPerUser
    );
    var perpetualLicenseCost =
      miscellaneousCalculations.getPerpetualLicenseCost(userCount);
    var documentManagementCost = commonCalculations.getDocumentManagementCost(
      userCount,
      documentManagement
    );

    var serverEnergyCost = commonCalculations.getServerEnergyCost(userCount);

    // console.log('appSubscriptionFee: ', appSubscriptionFee);
    // console.log('perpetualLicenseCost: ', perpetualLicenseCost);
    // console.log('documentManagementCost: ', documentManagementCost);
    // console.log('serverEnergyCost: ', serverEnergyCost);

    return Math.round(
      (appSubscriptionFee +
        perpetualLicenseCost +
        documentManagementCost +
        serverEnergyCost) *
        5 *
        12
    );
  } else {
    var appSubscriptionFee = miscellaneousCalculations.getAppSubscriptionFee(
      userCount,
      costPerUser
    );
    var MSOfficeCost = miscellaneousCalculations.getMSOfficeCost(userCount);

    console.log('CLOUD appSubscriptionFee:', appSubscriptionFee);
    console.log('CLOUD MSOfficeCost:', MSOfficeCost);

    return Math.round((appSubscriptionFee + MSOfficeCost) * 12 * 5);
  }
};

const calculateITAdmin = (hostingLocation, userCount) => {
  const medianHoursPerUser = commonCalculations.getMedianHourPerUser();
  const averageHourlyITLabourRate = ITAdminCost.AVERAGE_HOURLY_IT_LABOUR_RATE;
  const impliedCloudITHoursPerUser =
    miscellaneousCalculations.getImpliedCloudITHoursPerUser(medianHoursPerUser);

  if (hostingLocation === constants.ON_PREM)
    return Math.round(
      userCount * medianHoursPerUser * averageHourlyITLabourRate * 12 * 5
    );
  else
    return Math.round(
      userCount *
        impliedCloudITHoursPerUser *
        averageHourlyITLabourRate *
        12 *
        5
    );
};

const calculateInfrastructure = (
  hostingLocation,
  userCount,
  newHardwarePurchased
) => {
  if (hostingLocation === constants.CLOUD) return 0;

  return commonCalculations.getInfrastructureCost(
    userCount,
    newHardwarePurchased
  );
};

module.exports = {
  calculateNeedles,
  calculateITAdmin,
  calculateInfrastructure,
};
