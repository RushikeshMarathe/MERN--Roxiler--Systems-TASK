const Transaction = require('../model/Transaction'); 
const { getMonthNumber } = require('../utility/months'); // Import the utility function

const getPriceRangeData = async (req, res) => {
    const { month } = req.query;

    // Validate month input
    if (!month) {
        return res.status(400).json({ message: 'Month is required' });
    }

    console.log("Month index:", month);

    const monthMap = {
        january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
        july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
    };

    const numericMonth = monthMap[month.toLowerCase()]; 

    if (!numericMonth) {
        return res.status(400).json({ message: 'Invalid month' });
    }

    try {
        // Define price ranges
        const priceRanges = [
            { range: '0 - 100', min: 0, max: 100 },
            { range: '101 - 200', min: 101, max: 200 },
            { range: '201 - 300', min: 201, max: 300 },
            { range: '301 - 400', min: 301, max: 400 },
            { range: '401 - 500', min: 401, max: 500 },
            { range: '501 - 600', min: 501, max: 600 },
            { range: '601 - 700', min: 601, max: 700 },
            { range: '701 - 800', min: 701, max: 800 },
            { range: '801 - 900', min: 801, max: 900 },
            { range: '901 - above', min: 901, max: Infinity },
        ];

        // Count the number of items in each price range
        const results = await Promise.all(priceRanges.map(async (priceRange) => {
            const count = await Transaction.countDocuments({
                $expr: { $eq: [{ $month: "$dateOfSale" }, numericMonth] },
                price: { $gte: priceRange.min, $lte: priceRange.max }
            });
            return {
                range: priceRange.range,
                count,
            };
        }));

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching price range data:', error);
        res.status(500).json({ message: 'Failed to fetch price range data', error: error.message });
    }
};

module.exports = {
    getPriceRangeData,
};
