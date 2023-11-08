import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../store/bookings";
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import AddFundsModal from "../AddFundsModal";
import RemoveFundsModal from "../RemoveFundsModal";
import './UserDetails.css'

const UserDetails = () => {
    const user = useSelector((state) => state.session.user)

    const { modalContent, setModalContent } = useModal();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRemoveFunds = () => {
        setIsModalOpen(true);
        setModalContent(<RemoveFundsModal onClose={() => setIsModalOpen(false)} />);
      };

      const handleAddFunds = () => {
        setIsModalOpen(true);
        setModalContent(<AddFundsModal onClose={() => setIsModalOpen(false)} />);
      };

    if (user) {
        return (
            <>
                <h2>Profile</h2>
                <div>
                    <h3>Account Info</h3>
                    <div>Username: {user.username}</div>
                    <div>Email: {user.email}</div>
                    <div>Account Balance: {user.balance}</div>
                </div>
                <div>
                    <button className="add-funds-btn" onClick={handleAddFunds}>
                        Add Funds
                    </button>
                    <button className="withdraw-funds-btn" onClick={handleRemoveFunds}>
                        Withdraw Funds
                    </button>
                </div>
            </>

        )
    } else {
        return (
            <Redirect to='/'></Redirect>
        )
    }
}

export default UserDetails;
