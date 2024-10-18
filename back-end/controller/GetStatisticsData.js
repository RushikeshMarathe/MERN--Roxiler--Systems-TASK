const Transaction = require('../model/Transaction');
const { getMonthNumber } = require('../utility/months');

const getStatisticsData = async (req, res) => {
  const { month, year } = req.query;

  // Validate month and year input
  if (!month) {
    return res.status(400).json({ message: 'Month is required' });
  }

  const monthIndex = getMonthNumber(month);
  if (monthIndex === null) {
    return res.status(400).json({ message: 'Invalid month' });
  }

  // If year is not provided, use the current year
  const currentYear = new Date().getFullYear();
  const selectedYear = year || currentYear;

  try {
    // Create date range for the selected month and year
    const startDate = new Date(selectedYear, monthIndex, 1);
    const endDate = new Date(selectedYear, monthIndex + 1, 0, 23, 59, 59, 999);

    console.log(`Start Date: ${startDate}, End Date: ${endDate}`);

    // Fetch transactions within the date range
    const transactions = await Transaction.find({
      dateOfSale: {
        $gte: startDate,
        $lte: endDate
      }
    });

    // Calculate totals
    let totalSaleAmount = 0;
    let totalSoldItems = 0;
    let totalNotSoldItems = 0;
    let totalItems = transactions.length;

    transactions.forEach(transaction => {
      totalSaleAmount += transaction.price;
      if (transaction.sold) {
        totalSoldItems++;
      } else {
        totalNotSoldItems++;
      }
    });

    // Calculate additional statistics (optional)
    let averagePrice = totalSaleAmount / totalItems;
    let medianPrice = calculateMedian(transactions.map(transaction => transaction.price)); // Implement median calculation

    // Construct response
    const response = {
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
      totalItems,
      averagePrice, // Optional
      medianPrice // Optional
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Helper function to calculate median
function calculateMedian(prices) {
  // Sort prices in ascending order
  prices.sort((a, b) => a - b);

  const middleIndex = Math.floor(prices.length / 2);

  if (prices.length % 2 === 0) {
    // Even number of elements, calculate average of middle two
    return (prices[middleIndex - 1] + prices[middleIndex]) / 2;
  } else {
    // Odd number of elements, return middle element
    return prices[middleIndex];
  }
}

module.exports = getStatisticsData;