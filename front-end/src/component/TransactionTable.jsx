import React, { useEffect, useState } from 'react';
import Statistics from './Statistics'; 
import TransactionsBarChart from './TransactionBarChart'; // Import the TransactionsBarChart component

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [month, setMonth] = useState('March');
    const [search, setSearch] = useState('');
    const [totalCount, setTotalCount] = useState(0);

    const fetchTransactions = async () => {
        setLoading(true);
        setError(null); // Reset error before fetch
        try {
            const response = await fetch(`http://localhost:3000/api/v1/transactions?month=${month}&page=${page}&perPage=${perPage}&search=${encodeURIComponent(search)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTransactions(data.transactions);
            setTotalCount(data.totalCount);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [month, page, search]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1); // Reset to the first page when searching
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
        setPage(1); // Reset to the first page when changing month
    };

    const handleNextPage = () => {
        if ((page - 1) * perPage + transactions.length < totalCount) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen flex flex-col md:flex-row">
            {/* Left Column: Transaction Table */}
            <div className="flex-1 mb-6 md:mb-0 md:mr-6">
                <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Transaction Table</h1>
                {/* Month Dropdown */}
                <div className="mb-4 flex items-center justify-between">
                    <label htmlFor="month" className="mr-2 text-lg font-medium text-gray-700">Select Month:</label>
                    <select
                        id="month"
                        value={month}
                        onChange={handleMonthChange}
                        className="border border-gray-400 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(monthOption => (
                            <option key={monthOption} value={monthOption}>{monthOption}</option>
                        ))}
                    </select>
                </div>
                {/* Search Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={search}
                        onChange={handleSearchChange}
                        className="border border-gray-400 rounded-md p-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                {loading && <p className="text-indigo-600">Loading transactions...</p>}
                {error && <p className="text-red-600">Error fetching transactions: {error}</p>}
                {!loading && !error && (
                    <>
                        {transactions.length === 0 ? (
                            <p className="text-gray-600">No transactions available.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                    <thead>
                                        <tr className="bg-indigo-600 text-white">
                                            <th className="py-4 px-6 text-left text-sm font-semibold">ID</th>
                                            <th className="py-4 px-6 text-left text-sm font-semibold">Title</th>
                                            <th className="py-4 px-6 text-left text-sm font-semibold">Description</th>
                                            <th className="py-4 px-6 text-left text-sm font-semibold">Price</th>
                                            <th className="py-4 px-6 text-left text-sm font-semibold">Category</th>
                                            <th className="py-4 px-6 text-left text-sm font-semibold">Sold</th>
                                            <th className="py-4 px-6 text-left text-sm font-semibold">Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((transaction, index) => (
                                            <tr key={transaction._id} className="hover:bg-gray-100">
                                                <td className="py-4 px-6 border-b border-gray-200">{(page - 1) * perPage + index + 1}</td>
                                                <td className="py-4 px-6 border-b border-gray-200">{transaction.title}</td>
                                                <td className="py-4 px-6 border-b border-gray-200">{transaction.description}</td>
                                                <td className="py-4 px-6 border-b border-gray-200">${transaction.price.toFixed(2)}</td>
                                                <td className="py-4 px-6 border-b border-gray-200">{transaction.category}</td>
                                                <td className="py-4 px-6 border-b border-gray-200">{transaction.sold ? 'Yes' : 'No'}</td>
                                                <td className="py-4 px-6 border-b border-gray-200">
                                                    {transaction.image ? (
                                                        <img
                                                            src={transaction.image}
                                                            alt={transaction.title}
                                                            className="h-16 w-16 object-cover rounded-lg shadow-lg border border-gray-300 transition-transform duration-200 transform hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">N/A</div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <div className="flex justify-between items-center mt-4">
                            <button 
                                onClick={handlePreviousPage} 
                                disabled={page === 1} 
                                className={`bg-indigo-600 text-white py-2 px-4 rounded-md transition-colors duration-200 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                            >
                                Previous
                            </button>
                            <span className="text-lg text-gray-700">Page {page} of {Math.ceil(totalCount / perPage)}</span>
                            <button 
                                onClick={handleNextPage} 
                                disabled={(page - 1) * perPage + transactions.length >= totalCount} 
                                className={`bg-indigo-600 text-white py-2 px-4 rounded-md transition-colors duration-200 ${((page - 1) * perPage + transactions.length >= totalCount) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Right Column: Statistics and Bar Graph */}
            <div className="w-11/20 ">
                <Statistics selectedMonth={month} />
                <TransactionsBarChart selectedMonth={month} />
            </div>
        </div>
    );
};

export default TransactionTable;
