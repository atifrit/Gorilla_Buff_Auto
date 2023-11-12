import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../store/bookings";
import { getTransactions } from "../../store/transactions";
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import AddFundsModal from "../AddFundsModal";
import RemoveFundsModal from "../RemoveFundsModal";
import TransactionUpdateModal from "../TransactionUpdateModal";
import './UserDetails.css'

function reformatDate(date) {
    let newDate = new Date(date).toLocaleDateString('en-US', {
        timeZone: 'UTC',
    }).replace(/\//g, '-');
    return newDate;
}

const UserDetails = () => {
    const user = useSelector((state) => state.session.user)
    const transactions = useSelector((state) => state.transactions)
    const bookings = useSelector((state) => state.bookings)
    const dispatch = useDispatch();
    console.log('transactions.hydrated: ', transactions.hydrated)
    const { modalContent, setModalContent } = useModal();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = (e) => {
        setShowMenu(false);
    };
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
            <div className="profileContainer">
                <h2>Profile</h2>
                <div className="signupformMod">
                    <h3>Account Info</h3>
                    <div className='displayText'>Username: {user.username}</div>
                    <div className='displayText'>Email: {user.email}</div>
                    <div className='displayText'>Account Balance: ${user.balance.toFixed(2)}</div>
                </div>
                <div>
                    <button className="withdrawbutton" onClick={handleAddFunds}>
                        Add Funds
                    </button>
                    <button className="withdrawbutton" onClick={handleRemoveFunds} disabled={user.balance == 0 || user.balance < 0}>
                        Withdraw Funds
                    </button>
                </div>
                <div>
                    <h2 className='h1title'>Transaction History</h2>
                    <div>
                        {transactions.transactionObjs.map((transaction) => {
                            let bookingDate
                            let bookingId
                            for(let el of bookings.user_bookings) {
                                if (transaction.booking_id == el.id) {
                                    bookingDate = el.appointment_date;
                                    bookingId = el.id
                                    bookingDate = el.appointment_date
                                }
                            }
                            return (
                                <div  className="signupformMod">
                                    <p>Booking Date: {reformatDate(bookingDate)}</p>
                                    <p>Transaction Date: {reformatDate(transaction.created_at)}</p>
                                    <p>Payment Method: {transaction.payment_method}</p>
                                    <p>Transaction Amount: {transaction.price.toFixed(2)}</p>
                                    <OpenModalButton
                                        className='withdrawbutton'
                                        buttonText="Update Payment Method"
                                        onItemClick={closeMenu}
                                        modalComponent={
                                            <TransactionUpdateModal
                                                transaction_id={transaction.id}
                                                paymentMethod={transaction.payment_method}
                                                booking_id={bookingId}
                                                price={transaction.price}
                                                user={user}
                                            />
                                        }
                                        hidden={new Date().getTime() >= new Date(bookingDate).getTime() ? true : false}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        )
    } else {
        return (
            <Redirect to='/'></Redirect>
        )
    }
}

export default UserDetails;
