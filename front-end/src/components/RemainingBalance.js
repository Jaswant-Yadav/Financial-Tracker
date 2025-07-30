import React, { useState, useEffect } from 'react';

const RemainingBalance = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);


    const fetchData = async () => {
        try {
            const response = await fetch('https://back-expense-2.onrender.com/finances');
            const data = await response.json();


            const incomeRecords = data.filter(item => item.category === 'Income');
            const expenseRecords = data.filter(item => item.category === 'Expense');

            setIncomeData(incomeRecords);
            setExpenseData(expenseRecords);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch data initially and set an interval to refresh data every 5 seconds
    useEffect(() => {
        fetchData(); // Fetch initial data
        const interval = setInterval(() => {
            fetchData(); // Fetch data periodically (every 5 seconds)
        }, 5000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    // Calculate total income
    const totalIncome = incomeData.reduce((total, item) => total + item.amount, 0);

    // Calculate total expense
    const totalExpense = expenseData.reduce((total, item) => total + item.amount, 0);

    // Calculate remaining balance (Income - Expense)
    const remainingBalance = totalIncome - totalExpense;

    return (
        <div>
            <h1>Total Remaining Balance</h1>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                <p>Total Income: {totalIncome}</p>
                <p>Total Expense: {totalExpense}</p>
                <p style={{ color: remainingBalance >= 0 ? 'green' : 'red' }}>
                    Remaining Balance: {remainingBalance}
                </p>
            </div>
        </div>
    );
};

export default RemainingBalance;
