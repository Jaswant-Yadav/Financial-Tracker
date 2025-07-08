import React, { useState, useEffect } from 'react';

const Income = () => {
    const [incomeData, setIncomeData] = useState([]);


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/finances');
            const data = await response.json();



            const incomeRecords = data.filter(item => item.category === 'Income');
         
            setIncomeData(incomeRecords);
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

    const totalIncome = incomeData.reduce((total, item) => total + item.amount, 0);

    return (
        <div className="Finance-list">
            <h1>Income List</h1>
            <ul>
                <li><strong>Sr. no.</strong></li>
                <li><strong>Description</strong></li>
                <li><strong>Category</strong></li>
                <li><strong>Amount</strong></li>

            </ul>

            {
                incomeData.length > 0 ? (
                    incomeData.map((item, index) => (
                        <ul key={item._id}>
                            <li>{index + 1}</li>
                            <li>{item.description}</li>
                            <li>{item.category}</li>
                            <li>{item.amount}</li>
                        </ul>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No income data available</td>
                    </tr>
                )
            }
            {/* Display total income */}
            <ul>
                <li colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Income</li>
                <li style={{ fontWeight: 'bold' }}>{totalIncome}</li>
            </ul>

        </div>
    );
};

export default Income;
