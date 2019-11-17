jest.mock('./predict', () => {
    return () => Promise.resolve(9.3)
})

const supertest = require('supertest');
const app = require('./app');
const request = supertest(app);

describe('app tests', () => {
    it('should respond for requests at /predict-inventory with calls to getAutoMLPrediction', async () => {

        const response = await request.post('/predict-inventory', { 
            stationAddress: 'Duboce Park', 
            timeStamp: '1573854656'
        });

        expect(JSON.parse(response.text)).toEqual({ predictedInventory: 9.3 });
    });
})