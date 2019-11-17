setTimeout().__proto__.unref = () => {}

const mockPredict = jest.fn(() => Promise.resolve([
    { 
        payload: [
            { 
                tables: {
                    value: {
                        numberValue: 5.5
                    }
                }
            }
        ]
    }
]));

jest.mock('./create-client', () => ({
    predict: mockPredict,
    modelPath: () => 'mock/path'
}));

const getAutoMLPrediction = require('./predict');

describe('inventory prediction tests', () => {
    it('should make a call to the AutoML client with the timestamp and station address', async () => {
        const predictedInventory = await getAutoMLPrediction('123 Main Street', '1573854656');
        expect(mockPredict).toHaveBeenCalledWith({
            name: 'mock/path',
            params: {},
            payload: {
                row: {
                    values: [
                        { stringValue: '123 Main Street'},
                        { stringValue: '1573854656' }
                    ],
                    columnSpecIds: [
                        "3717477400812978176",
                        "835173639295860736"
                    ]
                }
            }
        });
        expect(predictedInventory).toBe(5.5)
    })
})