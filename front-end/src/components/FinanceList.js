import React, { useState, useEffect } from "react";


const FinanceList = () => {
    const [finances, setFinances] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFinance, setSelectedFinance] = useState({
        _id: "",
        description: "",
        category: "",
        amount: "",
    });

    useEffect(() => {
        getFinances();
    }, []);

    const getFinances = async () => {
        let result = await fetch('http://localhost:5000/finances');
        result = await result.json();
        setFinances(result);
    };

    const deleteFinance = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (isConfirmed) {
            let result = await fetch(`http://localhost:5000/finances/${id}`, {
                method: "DELETE",
            });
            result = await result.json();
            if (result) {
                getFinances();
            }
        }
    };

    const handleUpdateClick = (item) => {
        setSelectedFinance({
            _id: item._id,
            description: item.description,
            category: item.category,
            amount: item.amount,
        });
        setShowModal(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const updatedFinance = {
            description: selectedFinance.description,
            category: selectedFinance.category,
            amount: selectedFinance.amount,
        };

        let result = await fetch(`http://localhost:5000/finances/${selectedFinance._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFinance),
        });

        result = await result.json();
        if (result) {
            setShowModal(false);
            getFinances();
        }
    };

    return (
        <div className="Finance-list">
            <h3>Statement</h3>
            <ul>
                <li><strong>Sr. no.</strong></li>
                <li><strong>Description</strong></li>
                <li><strong>Category</strong></li>
                <li><strong>Amount</strong></li>
                <li><strong>Operation</strong></li>
            </ul>
            {
                finances.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.description}</li>
                        <li>{item.category}</li>
                        <li>{item.amount}</li>
                        <li className="btn">
                            <button onClick={() => deleteFinance(item._id)} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5
                                    0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2
                                    0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0
                                    0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042
                                    3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0
                                    0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.
                                    5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0
                                    0 1 .5-.5" />
                                </svg>
                            </button>
                            <button onClick={() => handleUpdateClick(item)} >Update</button>
                        </li>
                    </ul>
                )
            }

            {/* Update Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Update Statement</h4>
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label>Description:</label>
                                <input
                                    type="text"
                                    value={selectedFinance.description}
                                    onChange={(e) => setSelectedFinance({ ...selectedFinance, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div>

                                <label>Category:</label>
                                <select className="inputBox-home" value={selectedFinance.category}
                                    onChange={(e) => setSelectedFinance({ ...selectedFinance, category: e.target.value })}
                                    required>
                                    <option value="Income">Income</option>
                                    <option value="Expense" >Expense</option>
                                </select>
                            </div>
                            <div>
                                <label>Amount:</label>
                                <input
                                    type="number"
                                    value={selectedFinance.amount}
                                    onChange={(e) => setSelectedFinance({ ...selectedFinance, amount: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinanceList;
