import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import TransactionTable from './component/TransactionTable';
import Statistics from './component/Statistics';

function App() {
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const url = `http://localhost:3000/api/v1/initialize-db`;
        console.log(`Initializing database at: ${url}`);
        
        const response = await axios.get(url);
        console.log('Database initialized:', response.data);
      } catch (error) {
        console.error('Error initializing database:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    initializeDatabase();
  }, []);

  return (
    <div >
      {loading ? <p className='text-center'>Loading...</p> : <TransactionTable />
      
}


    </div>
  );
}

export default App;
