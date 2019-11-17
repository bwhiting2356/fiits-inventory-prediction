/*

Developing locally:
export GOOGLE_APPLICATION_CREDENTIALS=key.json
export GOOGLE_CREDENTIALS_JSON=$(cat key.json)

*/

const fs = require('fs');
fs.writeFileSync('key.json', process.env.GOOGLE_CREDENTIALS_JSON);

const automl = require('@google-cloud/automl');

const client = new automl.PredictionServiceClient();

module.exports = client;