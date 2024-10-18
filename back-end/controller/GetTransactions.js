const Transaction = require('../model/Transaction');

const getTransactions = async (req, res) => {
    const { month, page = 1, perPage = 10, search = '' } = req.query;

    // Convert month name to index (1 for January, 12 for December)
    const monthIndex = new Date(Date.parse(month + " 1, 2022")).getMonth() + 1;

    // Create the correct query structure for MongoDB date aggregation
    const query = {
        $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthIndex]
        }
    };

    // Add search conditions if search parameter exists
    if (search) {
        const regex = new RegExp(search, 'i');
        query.$or = [
            { title: regex },
            { description: regex },
            { category: regex }
        ];
    }

    try {
        // Log the query for debugging
        console.log('Query:', JSON.stringify(query));
        
        const totalCount = await Transaction.countDocuments(query);
        
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage))
            .sort({ dateOfSale: -1 });

        // Log the results for debugging
        console.log('Total count:', totalCount);
        console.log('First transaction:', transactions[0]);

        return res.json({ 
            totalCount, 
            transactions,
            query: query // Include query in response for debugging
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ 
            message: 'Error fetching transactions',
            error: error.message 
        });
    }
};

module.exports = {
    getTransactions,
};