const Transaction = require('../model/Transaction'); 
const { getMonthNumber } = require('../utility/months'); // Import the utility function

const getPriceRangeData = async (req, res) => {
    const { month } = req.query;

    // Validate month input
    if (!month) {
        return res.status(400).json({ message: 'Month is required' });
    }

    const monthIndex = getMonthNumber(month);
    if (monthIndex === null) {
        return res.status(400).json({ message: 'Invalid month' });
    }

    try {
        // Create date range for the selected month
        const year = new Date().getFullYear(); // Get the current year
        const startDate = new Date(year, monthIndex, 1); // Start of the month
        const endDate = new Date(year, monthIndex + 1, 1); // Start of the next month

        console.log(`Start Date: ${startDate}, End Date: ${endDate}`); // Log date range for debugging

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
                dateOfSale: { $gte: startDate, $lt: endDate }, // Check the date range
                price: { $gte: priceRange.min, $lt: priceRange.max }, // Check the price range
            });
            return {
                range: priceRange.range,
                count,
            };
        }));

        console.log("Price range data fetched successfully:", results); // Log the results

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching price range data:', error);
        res.status(500).json({ message: 'Failed to fetch price range data', error: error.message });
    }
};

module.exports = {
    getPriceRangeData,
};
