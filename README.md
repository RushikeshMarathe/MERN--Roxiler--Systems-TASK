Transaction Statistics API
This is a Node.js and Express-based API to calculate sales statistics for a set of transactions. It retrieves total sales, sold items, and unsold items for a given month based on transaction data stored in MongoDB.

Table of Contents
Getting Started
Installation
Environment Variables
Available API Endpoints
Project Structure
Technologies Used
License
Getting Started
These instructions will help you set up the project locally and run the API.

Prerequisites
Ensure that you have the following installed on your machine:

Node.js (v14 or higher)
MongoDB (local or cloud instance like MongoDB Atlas)
Git (optional, for version control)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/transaction-statistics-api.git
Navigate to the project directory:

bash
Copy code
cd transaction-statistics-api
Install dependencies:

bash
Copy code
npm install
Set up the environment variables:

Create a .env file in the root directory and set the following variables:

makefile
Copy code
MONGO_URI=your-mongodb-connection-string
PORT=3000
Replace your-mongodb-connection-string with the correct MongoDB URI for your local or cloud MongoDB instance.

Run the server:

bash
Copy code
npm start
The server should now be running on http://localhost:3000.

Environment Variables
The project uses the following environment variables:

MONGO_URI: MongoDB connection URI (required).
PORT: Port number for the server (optional, defaults to 3000).
Example .env file:

bash
Copy code
MONGO_URI=mongodb://localhost:27017/transactionsDB
PORT=3000
Available API Endpoints
Get Sales Statistics for a Given Month
Endpoint: /statistics

Method: GET

Query Parameters:

month: The name of the month for which you want statistics (e.g., May, June, etc.).
Response:

totalSaleAmount: Total amount from sold items.
totalSoldItems: Total count of sold items.
totalNotSoldItems: Total count of unsold items.
totalTransactions: Total number of transactions for the given month.
Example Request:

http
Copy code
GET /statistics?month=May
Example Response:

json
Copy code
{
  "totalSaleAmount": 269.55,
  "totalSoldItems": 1,
  "totalNotSoldItems": 2,
  "totalTransactions": 3
}
Project Structure
bash
Copy code
transaction-statistics-api/
├── controllers/
│   └── getStatisticsData.js  # Contains the logic for fetching statistics
├── models/
│   └── Transaction.js  # Mongoose model for Transaction
├── routes/
│   └── statistics.js  # API routes for statistics
├── utility/
│   └── months.js  # Helper for converting month names to numbers
├── .env  # Environment variables (not included in version control)
├── .gitignore  # Files and directories to ignore in Git
├── app.js  # Main server file
├── package.json  # Project metadata and dependencies
└── README.md  # Documentation
Models
Transaction.js: This is the Mongoose model representing a transaction. Each transaction document contains information like title, price, sold, and dateOfSale.
Controllers
getStatisticsData.js: This file contains the business logic to calculate statistics like total sales, total sold items, and unsold items for a specific month.
Routes
statistics.js: This defines the API routes for fetching sales statistics.
Technologies Used
Node.js: JavaScript runtime environment.
Express.js: Web framework for Node.js.
MongoDB: NoSQL database.
Mongoose: ODM library for MongoDB and Node.js.
dotenv: For managing environment variables.













