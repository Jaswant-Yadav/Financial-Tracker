import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FinanceList from "./FinanceList";

const Home = () => {
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();


const addFinance = async () => {
    console.log("Category:", category);
    console.log("Description:", description, "Amount:", amount);

    if (!description || !amount) {
        setError(true);
        return false;
    }

    
    
    try {
        console.log("Sending POST request to backend...");
        let result = await fetch('https://back-expense-2.onrender.com/finance', {
            method: 'POST',
            body: JSON.stringify({ description, category, amount, }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("Result from backend:", result); // Log the full response

        if (!result.ok) {
            throw new Error('Failed to add finance record');
        }

        const data = await result.json();

        if (!data || typeof data !== 'object') {
            throw new Error('Invalid response format');
        }

        console.log("Finance saved:", data);
        navigate('/');
    } catch (error) {
        console.error("Error adding finance:", error);
        alert('An error occurred while adding the finance record. Please try again later.');
    }
};

    return (
        <div>
            <div className="Home">
                <h1>Add Financial Statement</h1>
                <form onSubmit={addFinance}>
                    <label>Description: </label>
                    <input
                        type="text"
                        placeholder="Amount Description"
                        className="inputBox-home"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    /><br /><br />
                    {error && !description && <span className="invalid-input">Enter Description</span>}

                    <label>Category:
                        <select
                            className="inputBox-home"
                            value={category}
                            onChange={(e) => { setCategory(e.target.value) }}
                        >
                            <option value="select">Select</option>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                    </label><br /><br />
                    {error && category === "select" && <span className="invalid-input">Please select Category</span>}

                    <label>Amount:
                        <input
                            type="number"
                            placeholder="please enter amount"
                            className="inputBox-home"
                            value={amount}
                            onChange={(e) => { setAmount(e.target.value) }}
                        />
                    </label><br /><br />
                    {error && !amount && <span className="invalid-input">Enter Amount</span>}

                    <button className="submitBtn" type="submit">Submit</button>
                </form>
            </div>
            <FinanceList />
        </div>
    );
};

export default Home;
