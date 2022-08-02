const constants = require('../constants');
const needlesCost = require('../data/needlesCost.json');
const ITAdminCost = require('../data/ITAdminCost.json');
const aggregateCost = require('../data/aggregateCost.json');

module.exports.getAppSubscriptionFee = (userCount, costPerUser) => {
  return userCount * costPerUser;
};

module.exports.getPerpetualLicenseCost = (userCount) => {
  return (userCount * needlesCost.A) / needlesCost.B;
};

module.exports.getImpliedCloudITHoursPerUser = (medianHoursPerUser) => {
  return medianHoursPerUser * ITAdminCost.CLOUD_IT_HOURS_MULTIPLIER;
};

module.exports.getManagedITServices = (
  hostingLocation,
  userCount,
  medianHoursPerUser
) => {
  if (hostingLocation === constants.ON_PREM) {
    return (
      userCount *
      medianHoursPerUser *
      aggregateCost.AVERAGE_HOURLY_IT_LABOUR_RATE
    );
  } else {
    return (
      userCount *
      aggregateCost.AVERAGE_HOURLY_IT_LABOUR_RATE *
      (aggregateCost.IMPLIED_CLOUD_IT_HOURS_PER_USER_MULTIPLIER *
        medianHoursPerUser)
    );
  }
};

module.exports.getMSOfficeCost = (userCount) => {
  return aggregateCost.MS_OFFICE_COST_PER_USER * userCount;
};

module.exports.getGilmanBedigian = () => {
  const annualManagedITLaborHoursPurchased = 260;
  const users = 43;
  const multiplier = 0.3;
  const result = (annualManagedITLaborHoursPurchased / users) * multiplier;

  return result;
};

module.exports.getFullyManagedITEstimates = () => {
  const users = 10;
  const impliedAnnualLaborHours = 12;
  const multiplier = 0.3;
  const averageMonthlyperUserManagedITFee =
    aggregateCost.AVERAGE_HOURLY_IT_LABOUR_RATE;
  const result =
    Math.round(
      ((users * impliedAnnualLaborHours * averageMonthlyperUserManagedITFee) /
        150 /
        10) *
        multiplier
    ) / 12;

  return result;
};

module.exports.getFrenkelFrenkel = () => {
  const users = 37;
  const monthlyRecurringITSpend = 1400;
  const impliedAnnualLaborHours = 12;
  const averageMonthlyperUserManagedITFee =
    aggregateCost.AVERAGE_HOURLY_IT_LABOUR_RATE;
  const multiplier = 0.3;
  const result =
    (((monthlyRecurringITSpend * impliedAnnualLaborHours) /
      averageMonthlyperUserManagedITFee /
      users) *
      multiplier) /
    12;

  return result;
};

module.exports.getSystemAdminAllocation = () => {
  const worksDaysPerYear = 261;
  const PTODays = 15;
  const hoursWorkedPerDay = 8;
  const multiplier = 0.3;
  const result =
    Math.round((worksDaysPerYear - PTODays) * hoursWorkedPerDay * multiplier) /
    12 /
    50;

  return result;
};
