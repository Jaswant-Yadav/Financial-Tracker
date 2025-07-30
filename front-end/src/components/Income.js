import React, { useState, useEffect } from 'react';

const Income = () => {
    const [incomeData, setIncomeData] = useState([]);

    // Function to fetch data
    const fetchData = async () => {
        try {
            const response = await fetch('https://back-expense-2.onrender.com/finances');
            const data = await response.json();

            // Filter for income records
            const incomeRecords = data.filter(item => item.category === 'Income');
            setIncomeData(incomeRecords);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch data and set interval to refresh every 5 seconds
    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(interval);  // Cleanup interval on component unmount
    }, []);

    // Calculate total income
    const totalIncome = incomeData.reduce((total, item) => total + item.amount, 0);

    return (
        <div className="Finance-list">
            <h1>Income List</h1>
            
            {/* Table to display income records */}
            <table>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {incomeData.length > 0 ? (
                        incomeData.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.description}</td>
                                <td>{item.category}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No income data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br /><br />
            {/* Display total income */}
            <div className="total-income">
                <p><strong>Total Income: </strong> {totalIncome}</p>
                
            </div>
        </div>
    );
};

export default Income;
