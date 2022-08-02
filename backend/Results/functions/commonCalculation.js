const needlesCost = require('../data/needlesCost.json');
const ITAdminCost = require('../data/ITAdminCost.json');
const miscellaneousCalculations = require('./miscellaneousCalculations');
const infrastructureCost = require('../data/infrastructureCost.json');

module.exports.getInfrastructureCost = (userCount, newHardwarePurchased) => {
  if (newHardwarePurchased === 'Not Applicable') return 0;

  if (userCount <= 20) {
    var cost =
      infrastructureCost.DELL_POWEREDGE['1-20'] +
      infrastructureCost.SMART_UPS['1-20'] +
      infrastructureCost.DELL_48['1-20'] +
      infrastructureCost.SONIC_WALL_ULTRA['1-20'] +
      infrastructureCost.NETWORK_ATTACHED['1-20'] +
      infrastructureCost.SONIC_WALL_WIFIT['1-20'] +
      infrastructureCost.INSTALLATION['1-20'];
  } else if (userCount <= 50) {
    var cost =
      infrastructureCost.DELL_POWEREDGE['21-50'] +
      infrastructureCost.SMART_UPS['21-50'] +
      infrastructureCost.DELL_48['21-50'] +
      infrastructureCost.NETWORK_ATTACHED['21-50'] +
      infrastructureCost.SONIC_WALL_ULTRA['21-50'] +
      infrastructureCost.SONIC_WALL_WIFIT['21-50'] * 2 +
      infrastructureCost.INSTALLATION['21-50'];
  } else if (userCount <= 75) {
    var cost =
      infrastructureCost.DELL_POWEREDGE['51-75'] +
      infrastructureCost.SMART_UPS['51-75'] * 2 +
      infrastructureCost.DELL_48['51-75'] +
      infrastructureCost.NETWORK_ATTACHED['51-75'] +
      infrastructureCost.SONIC_WALL_ULTRA['51-75'] +
      infrastructureCost.SONIC_WALL_WIFIT['51-75'] * 4 +
      infrastructureCost.INSTALLATION['51-75'];
  } else if (userCount <= 100) {
    var cost =
      infrastructureCost.DELL_POWEREDGE['76-100'] +
      infrastructureCost.SMART_UPS['76-100'] * 2 +
      infrastructureCost.DELL_48['76-100'] +
      infrastructureCost.NETWORK_ATTACHED['76-100'] +
      infrastructureCost.SONIC_WALL_ULTRA['76-100'] +
      infrastructureCost.SONIC_WALL_WIFIT['76-100'] * 8 +
      infrastructureCost.INSTALLATION['76-100'];
  } else if (userCount <= 125) {
    var cost =
      infrastructureCost.DELL_POWEREDGE['101-125'] +
      infrastructureCost.SMART_UPS['101-125'] * 2 +
      infrastructureCost.DELL_48['101-125'] +
      infrastructureCost.NETWORK_ATTACHED['101-125'] +
      infrastructureCost.SONIC_WALL_ULTRA['101-125'] +
      infrastructureCost.SONIC_WALL_WIFIT['101-125'] * 8 +
      infrastructureCost.INSTALLATION['101-125'];
  } else if (userCount <= 150) {
    var cost =
      infrastructureCost.DELL_POWEREDGE['126-150'] +
      infrastructureCost.SMART_UPS['126-150'] * 2 +
      infrastructureCost.DELL_48['126-150'] +
      infrastructureCost.NETWORK_ATTACHED['126-150'] +
      infrastructureCost.SONIC_WALL_ULTRA['126-150'] +
      infrastructureCost.SONIC_WALL_WIFIT['126-150'] * 10 +
      infrastructureCost.INSTALLATION['126-150'];
  } else if (userCount <= 175) {
    var cost =
      infrastructureCost.DELL_POWEREDGE['151-175'] +
      infrastructureCost.SMART_UPS['151-175'] * 2 +
      infrastructureCost.DELL_48['151-175'] +
      infrastructureCost.NETWORK_ATTACHED['151-175'] +
      infrastructureCost.SONIC_WALL_ULTRA['151-175'] +
      infrastructureCost.SONIC_WALL_WIFIT['151-175'] * 10 +
      infrastructureCost.INSTALLATION['151-175'];
  } else if (userCount <= 200) {
    var cost =
      infrastructureCost.DELL_POWEREDGE['176-200'] +
      infrastructureCost.SMART_UPS['176-200'] * 2 +
      infrastructureCost.DELL_48['176-200'] +
      infrastructureCost.NETWORK_ATTACHED['176-200'] +
      infrastructureCost.SONIC_WALL_ULTRA['176-200'] +
      infrastructureCost.SONIC_WALL_WIFIT['176-200'] * 10 +
      infrastructureCost.INSTALLATION['176-200'];
  } else if (userCount <= 225) {
    var cost =
      infrastructureCost.DELL_POWEREDGE['201-225'] +
      infrastructureCost.SMART_UPS['201-225'] * 3 +
      infrastructureCost.DELL_48['201-225'] +
      infrastructureCost.NETWORK_ATTACHED['201-225'] +
      infrastructureCost.SONIC_WALL_ULTRA['201-225'] +
      infrastructureCost.SONIC_WALL_WIFIT['201-225'] * 12 +
      infrastructureCost.INSTALLATION['201-225'];
  } else if (userCount <= 300) {
    var cost =
      infrastructureCost.DELL_POWEREDGE['226-300'] +
      infrastructureCost.SMART_UPS['226-300'] * 3 +
      infrastructureCost.DELL_48['226-300'] +
      infrastructureCost.NETWORK_ATTACHED['226-300'] +
      infrastructureCost.SONIC_WALL_ULTRA['226-300'] +
      infrastructureCost.SONIC_WALL_WIFIT['226-300'] * 17 +
      infrastructureCost.INSTALLATION['226-300'];
  } else if (userCount <= 400) {
    var cost =
      infrastructureCost.DELL_POWEREDGE['300+'] +
      infrastructureCost.SMART_UPS['300+'] * 4 +
      infrastructureCost.DELL_48['300+'] +
      infrastructureCost.NETWORK_ATTACHED['300+'] +
      infrastructureCost.SONIC_WALL_ULTRA['300+'] +
      infrastructureCost.SONIC_WALL_WIFIT['300+'] * 25 +
      infrastructureCost.INSTALLATION['300+'];
  }

  return cost;
};

module.exports.getAggregateInfrastructureCost = (userCount) => {
  if (userCount <= 20) {
    var cost =
      infrastructureCost.SMART_UPS['1-20'] +
      infrastructureCost.DELL_48['1-20'] +
      infrastructureCost.SONIC_WALL_ULTRA['1-20'] +
      infrastructureCost.SONIC_WALL_WIFIT['1-20'];
  } else if (userCount <= 50) {
    var cost =
      infrastructureCost.SMART_UPS['21-50'] +
      infrastructureCost.DELL_48['21-50'] +
      infrastructureCost.SONIC_WALL_ULTRA['21-50'] +
      infrastructureCost.SONIC_WALL_WIFIT['21-50'] * 2;
  } else if (userCount <= 75) {
    var cost =
      infrastructureCost.SMART_UPS['51-75'] * 2 +
      infrastructureCost.DELL_48['51-75'] +
      infrastructureCost.SONIC_WALL_ULTRA['51-75'] +
      infrastructureCost.SONIC_WALL_WIFIT['51-75'] * 4;
  } else if (userCount <= 100) {
    var cost =
      infrastructureCost.SMART_UPS['76-100'] * 2 +
      infrastructureCost.DELL_48['76-100'] +
      infrastructureCost.SONIC_WALL_ULTRA['76-100'] +
      infrastructureCost.SONIC_WALL_WIFIT['76-100'] * 8;
  } else if (userCount <= 125) {
    var cost =
      infrastructureCost.SMART_UPS['101-125'] * 2 +
      infrastructureCost.DELL_48['101-125'] +
      infrastructureCost.SONIC_WALL_ULTRA['101-125'] +
      infrastructureCost.SONIC_WALL_WIFIT['101-125'] * 8;
  } else if (userCount <= 150) {
    var cost =
      infrastructureCost.SMART_UPS['126-150'] * 2 +
      infrastructureCost.DELL_48['126-150'] +
      infrastructureCost.SONIC_WALL_ULTRA['126-150'] +
      infrastructureCost.SONIC_WALL_WIFIT['126-150'] * 10;
  } else if (userCount <= 175) {
    var cost =
      infrastructureCost.SMART_UPS['151-175'] * 2 +
      infrastructureCost.DELL_48['151-175'] +
      infrastructureCost.SONIC_WALL_ULTRA['151-175'] +
      infrastructureCost.SONIC_WALL_WIFIT['151-175'] * 10;
  } else if (userCount <= 200) {
    var cost =
      infrastructureCost.SMART_UPS['176-200'] * 2 +
      infrastructureCost.DELL_48['176-200'] +
      infrastructureCost.SONIC_WALL_ULTRA['176-200'] +
      infrastructureCost.SONIC_WALL_WIFIT['176-200'] * 10;
  } else if (userCount <= 225) {
    var cost =
      infrastructureCost.SMART_UPS['201-225'] * 3 +
      infrastructureCost.DELL_48['201-225'] +
      infrastructureCost.SONIC_WALL_ULTRA['201-225'] +
      infrastructureCost.SONIC_WALL_WIFIT['201-225'] * 12;
  } else if (userCount <= 300) {
    var cost =
      infrastructureCost.SMART_UPS['226-300'] * 3 +
      infrastructureCost.DELL_48['226-300'] +
      infrastructureCost.SONIC_WALL_ULTRA['226-300'] +
      infrastructureCost.SONIC_WALL_WIFIT['226-300'] * 17;
  } else if (userCount <= 400) {
    var cost =
      infrastructureCost.SMART_UPS['300+'] * 4 +
      infrastructureCost.DELL_48['300+'] +
      infrastructureCost.SONIC_WALL_ULTRA['300+'] +
      infrastructureCost.SONIC_WALL_WIFIT['300+'] * 25;
  }

  return cost;
};

module.exports.getMedianHourPerUser = () => {
  const medianArray = [
    miscellaneousCalculations.getGilmanBedigian(),
    miscellaneousCalculations.getFullyManagedITEstimates(),
    miscellaneousCalculations.getFrenkelFrenkel(),
    miscellaneousCalculations.getSystemAdminAllocation(),
  ].sort();
  const arrayLength = medianArray.length;

  const median =
    arrayLength % 2 === 0
      ? (medianArray[arrayLength / 2 - 1] + medianArray[arrayLength / 2]) / 2
      : medianArray[Math.round(arrayLength / 2)] / 2;

  return median;
};

module.exports.getDocumentManagementCost = (userCount, documentManagement) => {
  return documentManagement
    ? userCount * needlesCost.DOCUMENT_MANAGEMENT_COST_PER_USER
    : 0;
};

module.exports.getDataBackupCost = (dataBackup) => {
  return dataBackup ? needlesCost.DATA_BACKUP_COST : 0;
};

module.exports.getServerEnergyCost = (userCount) => {
  if (userCount <= 20) var userRange = '1-20';
  else if (userCount <= 50) var userRange = '21-50';
  else if (userCount <= 75) var userRange = '51-75';
  else if (userCount <= 100) var userRange = '76-100';
  else if (userCount <= 125) var userRange = '101-125';
  else if (userCount <= 150) var userRange = '126-150';
  else if (userCount <= 175) var userRange = '151-175';
  else if (userCount <= 200) var userRange = '176-200';
  else userRange = '201-400';

  const impliedDailyWatts =
    needlesCost.WATT_PER_HOUR[userRange] * needlesCost.HOURS_PER_DAY;
  const dailyKWHour = impliedDailyWatts / 1000;
  const annualKWHour = dailyKWHour * 365;
  const annualServerEnergyCost = needlesCost.AVERAGE_KWH_COST * annualKWHour;
  const impliedMonthly = needlesCost.AVERAGE_KWH_COST * annualServerEnergyCost;

  return Math.round(impliedMonthly);
};

module.exports.calculateImplementation = (
  hostingLocation,
  version,
  documentManagement,
  userCount
) => {
  console.log(
    'hostingLocation: ',
    hostingLocation,
    'version: ',
    version,
    'documentManagement: ',
    documentManagement,
    'userCount: ',
    userCount
  );
  if (hostingLocation === 'ON_PREM') return 0;

  switch (version) {
    case 'TrialWorks':
      switch (documentManagement) {
        case true:
          if (userCount <= 10) return 4000;
          else if (userCount <= 25) return 8750;
          else if (userCount <= 50) return 15000;
          else return (15000 / 50) * userCount;
        case false:
          if (userCount <= 10) return 2500;
          else if (userCount <= 25) return 7250;
          else if (userCount <= 50) return 13500;
          else return (13500 / 50) * userCount;
      }
      break;
    case 'Needles 4':
    case 'Needles 5':
      switch (documentManagement) {
        case true:
          if (userCount <= 10) return 4750;
          else if (userCount <= 25) return 9750;
          else if (userCount <= 50) return 16000;
          else return (16000 / 50) * userCount;
        case false:
          if (userCount <= 10) return 3250;
          else if (userCount <= 25) return 8250;
          else if (userCount <= 50) return 14500;
          else return (14500 / 50) * userCount;
      }
      break;
    default:
      return -1;
  }
};
