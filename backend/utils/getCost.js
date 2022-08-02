const csv=require('csvtojson')
const AWS = require('aws-sdk')
require('dotenv').config()

const S3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_ID,  
  secretAccessKey: process.env.SECRET_ID,
  region: process.env.REGION_NAME,
  Bucket: process.env.BUCKET_NAME  
});
const params = {
  Bucket: process.env.BUCKET_NAME,
  Key: process.env.PRICE_FILE_NAME
};

const getCost = async() => {
  const stream = S3.getObject(params).createReadStream()
  const cost = await csv().fromStream(stream)
  return cost;
}

module.exports = getCost