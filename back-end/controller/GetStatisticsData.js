const Transaction = require('../model/Transaction');

const getStatisticsData = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: 'Month is required' });
  }

  try {

    // console.log(month);

    
        const monthMap = {
            january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
            july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
        };

        const numericMonth = monthMap[month.toLowerCase()]; // Convert to lowercase for case-insensitivity

        console.log(numericMonth);


    const salesResult = await Transaction.aggregate([
      {
          $match: {
              $expr: { $eq: [{ $month: "$dateOfSale" }, numericMonth] }, // Extract month
              sold: true // Only sum prices of sold products
          }
      },
      {
          $group: {
              _id: null,
              totalSales: { $sum: "$price" } // Sum prices of matching documents
          }
      }
  ]);   
  
  const totalSales = salesResult.length > 0 ? salesResult[0].totalSales : 0;


  console.log("sales : ",totalSales);


    const totalSoldItems = await Transaction.countDocuments({
      sold:true,
      $expr:{ $eq:[{$month:"$dateOfSale"},numericMonth]},

    });

    console.log("totalsaleitem",totalSoldItems);

    


    const totalUnsoldItems = await Transaction.countDocuments({
      sold:false,
      $expr:{ $eq:[{$month:"$dateOfSale"},numericMonth]},

    });

    console.log("unsold items : ",totalUnsoldItems);

    // const statisticsData = {
    //   totalSales,
    //   totalSoldItems,
    //   totalUnsoldItems
    // }

    // console.log("Statistics : ",statisticsData);

    res.status(200).json({
      totalSales,
      totalSoldItems,
      totalUnsoldItems,
    });

  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Failed to get statistics', error });
  }
};

module.exports = getStatisticsData;
