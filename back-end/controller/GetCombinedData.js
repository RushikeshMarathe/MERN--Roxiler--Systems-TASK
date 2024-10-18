const { getTransactions } = require('./GetTransactions'); 
const getStatisticsData = require("../controller/GetStatisticsData");
const { getCategoryData } = require('./GetCategoryData'); 

const getCombinedData = async (req, res) => {
    const { month } = req.query;

    // Validate month input
    if (!month) {
        return res.status(400).json({ message: 'Month is required' });
    }

    try {
        // Fetch transactions
        const transactionsResponse = await getTransactions(req, res);
        const transactions = transactionsResponse.transactions; 

        // Fetch statistics
        const statisticsResponse = await getStatisticsData(req, res);
        const statistics = statisticsResponse.data; 

        // Fetch category data
        const categoryResponse = await getCategoryData(req, res);
        const categories = categoryResponse; 

        // Combine the data into one response
        const combinedResponse = {
            transactions,
            statistics,
            categories,
        };

        res.status(200).json(combinedResponse);
    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).json({ message: 'Failed to fetch combined data', error: error.message });
    }
};

module.exports = {
    getCombinedData,
};
