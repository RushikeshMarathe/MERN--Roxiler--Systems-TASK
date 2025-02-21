import React, { useEffect, useState } from 'react';

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/statistics?month=${selectedMonth}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("***__Fetched statistics:", data);
      setStatistics(data);
    } catch (error) {
      console.error('Error fetching transaction statistics:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMonth) {
      console.log("Selected Month:", selectedMonth);
      fetchStatistics();
    }
  }, [selectedMonth]);

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Transaction Statistics for {selectedMonth}
      </h2>
      {loading && <p className="text-indigo-600">Loading statistics...</p>}
      {error && <p className="text-red-600">Error fetching statistics: {error}</p>}
      {statistics ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="text-sm font-medium text-gray-500">Total Sales Amount</p>
            <p className="mt-1 text-2xl font-semibold text-gray-800">
              ${statistics.totalSales|| 0}
            </p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="text-sm font-medium text-gray-500">Total Sold Items</p>
            <p className="mt-1 text-2xl font-semibold text-gray-800">
              {statistics.totalSoldItems || 0}
            </p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="text-sm font-medium text-gray-500">Total Unsold Items</p>
            <p className="mt-1 text-2xl font-semibold text-gray-800">
              {statistics.totalUnsoldItems ?? 0}
            </p>
          </div>
        </div>
      ) : (
        !loading && <p className="text-gray-600">No statistics available</p>
      )}
    </div>
  );
};

export default Statistics;
