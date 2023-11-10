import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeBalanceFromUser} from "../../store/session";

const RemoveFundsModal = () => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.session.user)

  const handleRemoveFunds = async () => {
    if (amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      await dispatch(removeBalanceFromUser(amount));
      closeModal()
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
        <p className="errors">{ user.balance < amount ? 'Insufficient Funds' : null}</p>
        <p className="errors">{ amount < 1 ? 'Invalid Amount' : null}</p>
        {error && <p className="error">{error}</p>}
        <button
          onClick={handleRemoveFunds}
          className="remove-funds"
          disabled={amount <= 0 || user.balance < amount}
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
