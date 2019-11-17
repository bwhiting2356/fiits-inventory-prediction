const automl = require('@google-cloud/automl');
const express = require('express');
const bodyParser = require('body-parser');
const getAutoMLPrediction = require('./predict');

const app = express();
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000;

app.post('/predict-inventory', async (req, res) => {
    const { stationAddress, timeStamp } = req.body;
    const predictedInventory = await getAutoMLPrediction(stationAddress, timeStamp);
    res.json({ predictedInventory });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
