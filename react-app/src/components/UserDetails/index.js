import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../store/bookings";
import { getTransactions } from "../../store/transactions";
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import AddFundsModal from "../AddFundsModal";
import RemoveFundsModal from "../RemoveFundsModal";
import './UserDetails.css'

const UserDetails = () => {
    const user = useSelector((state) => state.session.user)
    const transactions = useSelector((state) => state.transactions)
    const bookings = useSelector((state) => state.bookings)
    const dispatch = useDispatch();
    console.log('transactions.hydrated: ', transactions.hydrated)
    const { modalContent, setModalContent } = useModal();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!bookings.user_id) {
            dispatch(getUserBookings());
        }
    }, [dispatch, bookings])
    useEffect(() => {
        if (!transactions.hydrated) {
            dispatch(getTransactions());
        }
    })



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
                    <div>Account Balance: ${user.balance.toFixed(2)}</div>
                </div>
                <div>
                    <button className="add-funds-btn" onClick={handleAddFunds}>
                        Add Funds
                    </button>
                    <button className="withdraw-funds-btn" onClick={handleRemoveFunds} disabled={user.balance == 0 || user.balance < 0}>
                        Withdraw Funds
                    </button>
                </div>
                <div>
                    <h3>Transaction History</h3>
                    <div>
                        {transactions.transactionObjs.map((transaction) => {
                            let bookingDate
                            for(let el of bookings.user_bookings) {
                                if (transaction.booking_id == el.id) {
                                    bookingDate = el.appointment_date;
                                }
                            }
                            return (
                                <div>
                                    <p>Booking Date: {bookingDate}</p>
                                    <p>Transaction Date: {transaction.created_at}</p>
                                    <p>Payment Method: {transaction.payment_method}</p>
                                    <p>Transaction Amount: {transaction.price.toFixed(2)}</p>
                                    {/* <OpenModalButton
                                        className='openTransactionModal'
                                        buttonText="Update Payment Method"
                                        onItemClick={closeMenu}
                                        modalComponent={
                                            <TransactionUpdateModal
                                                car_type={carType}
                                                service_type={serviceType}
                                                appointment_date={appointmentDate}
                                                user={user}
                                            />
                                        }
                                    /> */}
                                </div>
                            )
                        })}
                    </div>
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
