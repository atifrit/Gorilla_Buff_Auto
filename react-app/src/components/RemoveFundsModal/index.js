import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeBalanceFromUser} from "../../store/session";

const RemoveFundsModal = () => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);

  const handleRemoveFunds = async () => {
    if (amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      await dispatch(removeBalanceFromUser(amount));
      window.location.reload();
    } catch (error) {
      if (error.error === "Insufficient funds") {
        setError("Insufficient funds. You cannot withdraw more than you have.");
      } else {
        setError("An error occurred while removing funds.");
      }
    }
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Remove Funds</h4>
        <p>How much would you like to withdraw?</p>
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
          onClick={handleRemoveFunds}
          className="remove-funds"
          disabled={amount <= 0}
        >
          Withdraw Funds
        </button>
        <button onClick={closeModal} className="cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RemoveFundsModal;
