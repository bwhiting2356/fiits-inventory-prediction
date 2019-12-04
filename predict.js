

const client = require('./create-client');

const getAutoMLPrediction = async (stationAddress, dayOfWeek, timeInMinutes) => {
    const modelFullId = client.modelPath('bike-share-1517478720061', 'us-central1', 'TBL8481250066617597952')
    const response = await client.predict({
        name: modelFullId,
        params: {},
        payload: {
            row: {
                values: [
                    { stringValue: stationAddress},
                    { stringValue: dayOfWeek },
                    { stringValue: timeInMinutes}
                ],
                columnSpecIds: [
                    "8434276730855751680",
                    "9010737483159175168",
                    "4687281840883499008"
                ]
            }
        }
    });
    return response[0].payload[0].tables.value.numberValue;
}

module.exports = getAutoMLPrediction;