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

        console.log(category)
        console.log(description, category, amount)
        if (!description || !amount) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/finance', {
            method: 'post',
            body: JSON.stringify({ description, category, amount, userId }),
            headers: {
                'content-type': 'application/json',

            }
        });
        result = await result.json();
        console.log(result);
        navigate('/')

    }

    return (
        <div>
        <div className="Home">
            <h1>Add Financial Statement</h1>
            <form>
                <label>Description : </label>
                <input type="text" placeholder="Amount Description" className="inputBox-home"
                    value={description} onChange={(e) => { setDescription(e.target.value) }} /><br /><br />
                {error && !description && <span className="invalid-input">Enter Description</span>}

                <label> Category :
                    <select className="inputBox-home" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="select">Select</option>
                        <option value="Income">Income</option>
                        <option value="Expense" >Expense</option>
                    </select>
                </label><br /><br />
                {error && !category && <span className="invalid-input">Please select Category</span>}

                <label>Amount :<input type="number" placeholder="please enter amount" className="inputBox-home"
                    value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                </label><br /><br />
                {error && !amount && <span className="invalid-input">Enter Amount</span>}

                <button className="submitBtn" onClick={addFinance} >Submit</button>
            </form>
            </div>
            <FinanceList />
        </div>
    )
}

export default Home