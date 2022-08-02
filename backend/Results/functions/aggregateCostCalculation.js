const commonCalculations = require('../functions/commonCalculation');
const miscellaneousCalculations = require('./miscellaneousCalculations');
const constants = require('../constants');
const infrastructureCostJSON = require('../data/infrastructureCost.json');

const calculateAggregateCost = (
  hostingLocation,
  userCount,
  costPerUser,
  newHWPurchasedIn,
  documentManagement,
  version
) => {
  const costArray = [];
  const medianHoursPerUser = commonCalculations.getMedianHourPerUser();

  if (hostingLocation === constants.ON_PREM) {
    for (let year = 1; year <= 5; year++) {
      const perpetualLicenseCost =
        miscellaneousCalculations.getPerpetualLicenseCost(userCount);
      const managedITServices = miscellaneousCalculations.getManagedITServices(
        constants.ON_PREM,
        userCount,
        medianHoursPerUser
      );
      const appSubscriptionFee =
        miscellaneousCalculations.getAppSubscriptionFee(userCount, costPerUser);
      const documentManagementCost =
        commonCalculations.getDocumentManagementCost(
          userCount,
          documentManagement
        );
      const serverEnergyCost =
        commonCalculations.getServerEnergyCost(userCount);

      const totalMonthlyCost = Math.round(
        perpetualLicenseCost +
          managedITServices +
          appSubscriptionFee +
          documentManagementCost +
          serverEnergyCost
      );

      console.log('perpetualLicenseCost: ', perpetualLicenseCost);
      console.log('managedITServices: ', managedITServices);
      console.log('appSubscriptionFee: ', appSubscriptionFee);
      console.log('documentManagementCost: ', documentManagementCost);
      console.log('serverEnergyCost: ', serverEnergyCost);
      console.log('totalMonthlyCost: ', totalMonthlyCost);

      let userRange;

      if (userCount <= 20) userRange = '1-20';
      else if (userCount <= 50) userRange = '21-50';
      else if (userCount <= 75) userRange = '51-75';
      else if (userCount <= 100) userRange = '76-100';
      else if (userCount <= 125) userRange = '101-125';
      else if (userCount <= 150) userRange = '126-150';
      else if (userCount <= 175) userRange = '151-175';
      else if (userCount <= 200) userRange = '176-200';
      else if (userCount <= 225) userRange = '201-225';
      else if (userCount <= 300) userRange = '226-300';
      else userRange = '300+';

      const onBoardingCost = infrastructureCostJSON.INSTALLATION[userRange];

      const serverPurchaseCost =
        infrastructureCostJSON.DELL_POWEREDGE[userRange];
      const serverBackupSolutionCost =
        infrastructureCostJSON.NETWORK_ATTACHED[userRange];
      const MSServerLicensingCost = userCount > 75 ? 3717 : 0;

      const infrastructureCost =
        commonCalculations.getAggregateInfrastructureCost(userCount);

      const totalUpfrontCost = Math.round(
        serverPurchaseCost +
          serverBackupSolutionCost +
          MSServerLicensingCost +
          onBoardingCost +
          infrastructureCost
      );

      console.log('totalUpfrontCost: serverPurchaseCost: ', serverPurchaseCost);
      console.log(
        'totalUpfrontCost: serverBackupSolutionCost: ',
        serverBackupSolutionCost
      );
      console.log(
        'totalUpfrontCost: MSServerLicensingCost: ',
        MSServerLicensingCost
      );
      console.log('totalUpfrontCost: onBoardingCost: ', onBoardingCost);
      console.log('totalUpfrontCost: infrastructureCost: ', infrastructureCost);

      if (year === newHWPurchasedIn) {
        const cost = totalUpfrontCost + totalMonthlyCost * 12;
        costArray.push(cost);
      } else {
        const cost = totalMonthlyCost * 12;
        costArray.push(cost);
      }
    }

    // console.log('ON_PREM: ', costArray);

    const aggregateCostArray = [costArray[0]];

    for (let i = 1; i < costArray.length; i++) {
      aggregateCostArray.push(
        aggregateCostArray[aggregateCostArray.length - 1] + costArray[i]
      );
    }

    return aggregateCostArray;
  } else {
    // For CLOUD
    const managedITServices = miscellaneousCalculations.getManagedITServices(
      constants.CLOUD,
      userCount,
      medianHoursPerUser
    );
    const MSOfficeCost = miscellaneousCalculations.getMSOfficeCost(userCount);
    const appSubscriptionFee = miscellaneousCalculations.getAppSubscriptionFee(
      userCount,
      costPerUser
    );
    const onBoardingCost = commonCalculations.calculateImplementation(
      'CLOUD',
      version,
      documentManagement,
      userCount
    );

    console.log('cloud: managedITServices: ', managedITServices);
    console.log('cloud: MSOfficeCost: ', MSOfficeCost);
    console.log('cloud: appSubscriptionFee: ', appSubscriptionFee);
    console.log('cloud: onBoardingCost: ', onBoardingCost);

    const totalMonthlyCost =
      (managedITServices + MSOfficeCost + appSubscriptionFee) * 12;

    costArray.push(Math.round(onBoardingCost + totalMonthlyCost));

    for (let year = 2; year <= 5; year++) {
      costArray.push(Math.round(costArray[year - 2] + totalMonthlyCost));
    }

    return costArray;
  }
};

module.exports.calculateAggregateCost = calculateAggregateCost;
