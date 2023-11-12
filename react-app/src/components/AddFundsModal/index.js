import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addBalanceToUser } from "../../store/session";
import "./AddFunds.css";

const AddFundsModal = () => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState(null);

  const handleAddFunds = async () => {
    if (amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      await dispatch(addBalanceToUser(amount));
      closeModal()
    } catch (error) {
      setError("An error occurred while adding funds.");
    }
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="modal-overlay">
      <div className="signupform">
        <h4 className='h4title'>Add Funds</h4>
        <p>How much would you like to add?</p>
        <input
          className="signupFormInput"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => {
            setAmount(parseFloat(e.target.value) || 0);
            setError(null);
          }}
        />
        <p className="errors">{ amount < 1 ? 'Invalid Amount' : null}</p>
        {error && <p className="error">{error}</p>}
        <button
          className='signupbutton'
          onClick={handleAddFunds}
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
