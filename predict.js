const automl = require('@google-cloud/automl');

const client = new automl.PredictionServiceClient();
const modelFullId = client.modelPath('bike-share-1517478720061', 'us-central1', 'TBL5065903067954675712')

const getAutoMLPrediction = async (stationAddress, timeStamp) => {
    const response = await client.predict({
        name: modelFullId,
        params: {},
        payload: {
            row: {
                values: [
                    { stringValue: stationAddress},
                    { stringValue: timeStamp }
                ],
                columnSpecIds: [
                    "3717477400812978176",
                    "835173639295860736"
                ]
            }
        }
    });
    
    return response[0].payload[0].tables.value.numberValue;
}

module.exports = getAutoMLPrediction;
