import axios from 'axios';


export const fetchTransactions = async (month, page, search) => {
    const response = await axios.get(`process.env.REACT_BASE_URL/transactions`, {
        params: {
            month,
            page,
            search,
        },
    });
    return response.data; // Make sure your backend returns the appropriate data format
};
