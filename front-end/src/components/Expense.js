import React, { useState, useEffect } from 'react';

const Expense = () => {
    const [expenseData, setExpenseData] = useState([]);


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/finances');
            const data = await response.json();



            const expenseRecords = data.filter(item => item.category === 'Expense');

            setExpenseData(expenseRecords);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);


    const totalExpense = expenseData.reduce((total, item) => total + item.amount, 0);

    return (
        <div className="Finance-list">
            <h1>Expense List</h1>

            <ul>
                <li><strong>Sr. no.</strong></li>
                <li><strong>Description</strong></li>
                <li><strong>Category</strong></li>
                <li><strong>Amount</strong></li>

            </ul>

            {
                expenseData.length > 0 ? (
                    expenseData.map((item, index) => (
                        <ul key={item._id}>
                            <li>{index + 1}</li>
                            <li>{item.description}</li>
                            <li>{item.category}</li>
                            <li>{item.amount}</li>
                        </ul>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No expense data available</td>
                    </tr>
                )
            }
            {/* Display total expense */}
            <ul>

                <li colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Expense</li>
                <li style={{ fontWeight: 'bold' }}>{totalExpense}</li>
            </ul>


        </div>
    );
};

export default Expense;
