import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addBalanceToUser } from "../../store/session";
// import "./addfundsmodal.css";

const AddFundsModal = () => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);

  const handleAddFunds = async () => {
    if (amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      await dispatch(addBalanceToUser(amount));
      window.location.reload();
    } catch (error) {
      setError("An error occurred while adding funds.");
    }
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Add Funds</h4>
        <p>How many funds do you want to add?</p>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => {
            setAmount(parseFloat(e.target.value) || 0);
            setError(null);
          }}
        />
        {error && <p className="error">{error}</p>}
        <button
          onClick={handleAddFunds}
          className="add-funds"
          disabled={amount <= 0}
        >
          Add Funds
        </button>
        <button onClick={closeModal} className="cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddFundsModal;
