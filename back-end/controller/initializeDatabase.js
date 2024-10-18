const Transaction = require('../model/Transaction'); 
const axios = require('axios');

const initializeDatabase = async (req, res) => {
    try {
        // Fetch the data from the third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        // Log the number of transactions fetched for debugging
        console.log(`Fetched ${transactions.length} transactions from the API.`);

        // Clear existing data to prevent duplication
        await Transaction.deleteMany({}); 

        // Map the fetched data to match your database schema
        const transactionData = transactions.map(item => ({
            title: item.title,
            price: item.price,
            description: item.description,
            category: item.category,
            image: item.image,
            sold: item.sold,
            dateOfSale: new Date(item.dateOfSale), // Ensure correct date format
        }));

        // Insert the processed data into the database
        const result = await Transaction.insertMany(transactionData);

        // Log the number of transactions inserted
        console.log(`Inserted ${result.length} transactions into the database.`);

        // Send a success response
        res.status(200).json({ 
            message: 'Database initialized successfully!', 
            count: result.length // Include the count of inserted records
        });
    } catch (error) {
        console.error('Error initializing the database:', error);
        // Send an error response with specific error details
        res.status(500).json({ 
            message: 'Error initializing the database', 
            error: error.message 
        });
    }
};

module.exports = {
    initializeDatabase,
};
