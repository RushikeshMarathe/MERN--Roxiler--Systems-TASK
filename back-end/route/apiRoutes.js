const express = require('express');
const router = express.Router();

const { getTransactions } = require('../controller/GetTransactions');
const getStatisticsData = require("../controller/GetStatisticsData");
const { getCategoryData } = require('../controller/GetCategoryData');
const { getPriceRangeData } = require('../controller/GetBarChartData');
const { getCombinedData } = require('../controller/GetCombinedData');
const { initializeDatabase } = require('../controller/initializeDatabase')

// Get transactions with pagination and search
router.get('/transactions', getTransactions);

// Get statistics for a selected month
router.get('/statistics', getStatisticsData); // Ensure this is correctly imported

// Get pie chart data
router.get('/pie-chart', getCategoryData);

// Get bar chart data
router.get('/bar-chart', getPriceRangeData);

// Combined data from all sources
router.get('/combined-data', getCombinedData);

router.get('/initialize-db', initializeDatabase);



module.exports = router;
