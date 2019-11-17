const express = require('express');
const bodyParser = require('body-parser');
const getAutoMLPrediction = require('./predict');

const app = express();
app.use(bodyParser.json())

app.post('/predict-inventory', async (req, res) => {
    const { stationAddress, timeStamp } = req.body;
    const predictedInventory = await getAutoMLPrediction(stationAddress, timeStamp);
    res.json({ predictedInventory });
});

module.exports = app;
