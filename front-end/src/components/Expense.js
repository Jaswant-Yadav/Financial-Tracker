import React, { useState, useEffect } from 'react';

const Expense = () => {
    const [expenseData, setExpenseData] = useState([]);

    // Function to fetch data
    const fetchData = async () => {
        try {
            const response = await fetch('https://back-expense-2.onrender.com/finances');
            const data = await response.json();

            // Filter for expense records
            const expenseRecords = data.filter(item => item.category === 'Expense');
            setExpenseData(expenseRecords);
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

    // Calculate total expense
    const totalExpense = expenseData.reduce((total, item) => total + item.amount, 0);

    return (
        <div className="Finance-list">
            <h1>Expense List</h1>

            {/* Table to display expense records */}
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
                    {expenseData.length > 0 ? (
                        expenseData.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.description}</td>
                                <td>{item.category}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No expense data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br /><br />

            {/* Display total expense */}
            <div className="total-expense">
                <p><strong>Total Expense: </strong> {totalExpense}</p>
            </div>
        </div>
    );
};

export default Expense;
