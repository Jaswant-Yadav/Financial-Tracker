import React, { useState, useEffect } from "react";

const FinanceList = () => {
  const [finances, setFinances] = useState([]); // Initialize as empty array
  const [showModal, setShowModal] = useState(false);
  const [selectedFinance, setSelectedFinance] = useState({
    _id: "",
    description: "",
    category: "",
    amount: "",
  });

  // Fetch the finances data from the backend
  useEffect(() => {
    getFinances();
  }, []);

  const getFinances = async () => {
    try {
      const response = await fetch('http://localhost:5000/finances');
      
      // Check if response is OK and content-type is JSON
      if (!response.ok) {
        console.error('Network response was not ok', response);
        return;
      }

      // Check for the content type to be JSON
      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Response is not JSON. Content-Type: ", contentType);
        return;
      }

      const data = await response.json();

      // Check if the data is an array or contains a 'result' message
      if (Array.isArray(data)) {
        setFinances(data);
      } else if (data.result === "No product found") {
        setFinances([]);
        console.log("No financial records found");
      } else {
        console.error("Unexpected data format:", data);
        setFinances([]);
      }
    } catch (error) {
      console.error('Error fetching finances:', error);
      setFinances([]); // Set to empty array if fetch fails
    }
  };

  // Delete finance record
  const deleteFinance = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      const result = await fetch(`http://localhost:5000/finances/${id}`, {
        method: "DELETE",
      });
      if (result.ok) {
        getFinances();
      }
    }
  };

  // Open modal to update the finance record
  const handleUpdateClick = (item) => {
    setSelectedFinance({
      _id: item._id,
      description: item.description,
      category: item.category,
      amount: item.amount,
    });
    setShowModal(true);
  };

  // Submit updated finance record
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedFinance = {
      description: selectedFinance.description,
      category: selectedFinance.category,
      amount: selectedFinance.amount,
    };

    const result = await fetch(`https://back-expense-2.onrender.com/finances/${selectedFinance._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFinance),
    });

    if (result.ok) {
      setShowModal(false);
      getFinances();
    }
  };

  return (
    <div className="Finance-list">
      <h3>Financial Statements</h3>
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(finances) && finances.length > 0 ? (
            finances.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.amount}</td>
                <td>
                  <button onClick={() => deleteFinance(item._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                    Delete
                  </button>
                  <button onClick={() => handleUpdateClick(item)}>Update</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No financial records available</td>
            </tr>
          )}
        </tbody>
      </table>

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
                <select
                  className="inputBox-home"
                  value={selectedFinance.category}
                  onChange={(e) => setSelectedFinance({ ...selectedFinance, category: e.target.value })}
                  required
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
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
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceList;
