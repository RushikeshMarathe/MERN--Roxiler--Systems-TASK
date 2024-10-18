import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionsBarChart = ({ selectedMonth, chartColors = ['rgba(75, 192, 192, 0.6)'] }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching data from the backend
    const fetchData = async () => {
        setLoading(true);
        setError(null); // Reset error before fetch
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/bar-chart`, {
                params: { month: selectedMonth },
            });
            setData(response.data); // Set the data received from the API
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
            setError('Failed to fetch data for the chart. Please try again later.'); // Improved error message
        } finally {
            setLoading(false); // Set loading to false after the request is complete
        }
    };

    // Fetch data whenever the selected month changes
    useEffect(() => {
        fetchData();
    }, [selectedMonth]);

    // Prepare data for the chart
    const chartData = {
        labels: data.map(item => item.range), // Price ranges from the API response
        datasets: [
            {
                label: 'Number of Items Sold',
                data: data.map(item => item.count), // Count of items sold
                backgroundColor: chartColors[0], // Use the first color from the passed colors
            },
        ],
    };

    // Chart options for customization
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 20, // Step size for the y-axis ticks
                },
            },
        },
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Sales Data for {selectedMonth}</h2>
            {loading && <p className="text-indigo-600">Loading chart data...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && data.length > 0 ? (
                <div style={{ height: '400px' }}>
                    <Bar data={chartData} options={options} />
                </div>
            ) : (
                <p className="text-gray-600">No data available for {selectedMonth}.</p>
            )}
        </div>
    );
};

// Define prop types
TransactionsBarChart.propTypes = {
    selectedMonth: PropTypes.string.isRequired,
    chartColors: PropTypes.arrayOf(PropTypes.string),
};

export default TransactionsBarChart;
