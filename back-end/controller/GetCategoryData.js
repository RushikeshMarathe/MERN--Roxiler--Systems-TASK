const Transaction = require('../model/Transaction'); 
const { getMonthNumber } = require('../utility/months'); // Import the utility function

const getCategoryData = async (req, res) => {
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
        const startDate = new Date(new Date().getFullYear(), monthIndex, 1);
        const endDate = new Date(new Date().getFullYear(), monthIndex + 1, 1);

        // Aggregate to find unique categories and count items in each category
        const categories = await Transaction.aggregate([
            {
                $match: {
                    dateOfSale: { $gte: startDate, $lt: endDate }, // Filter by date
                },
            },
            {
                $group: {
                    _id: '$category', // Group by category
                    count: { $sum: 1 }, // Count items in each category
                },
            },
        ]);

        // Format the result
        const formattedCategories = categories.map(item => ({
            category: item._id,
            count: item.count,
        }));

        res.status(200).json(formattedCategories);
    } catch (error) {
        console.error('Error fetching category data:', error);
        res.status(500).json({ message: 'Failed to fetch category data', error: error.message });
    }
};

module.exports = {
    getCategoryData,
};
