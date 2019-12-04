const express = require('express');
const bodyParser = require('body-parser');
const getAutoMLPrediction = require('./predict');

const app = express();
app.use(bodyParser.json())

const totalMinutesAfterMidnight = (hours, minutes) => {
    return (hours * 60) + minutes;
}

const getValuesFromTimestamp = date => {
    const dayOfWeek = date.getUTCDay();
    const timeInMinutes = totalMinutesAfterMidnight(date.getUTCHours(), date.getUTCMinutes());
    
    return { dayOfWeek, timeInMinutes };
}

app.post('/predict-inventory', async (req, res) => {
    const { stationAddress, timeStamp } = req.body;
    const { dayOfWeek, timeInMinutes } = getValuesFromTimestamp(new Date(parseInt(timeStamp)))
    const predictedInventory = await getAutoMLPrediction(stationAddress, dayOfWeek, timeInMinutes);
    res.json({ predictedInventory });
});

module.exports = app;
