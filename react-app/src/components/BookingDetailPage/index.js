import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../store/bookings";
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteFormModal from "../DeleteFormModal";
import './BookingDetailPage.css'
import { useModal } from "../../context/Modal";
import BookingUpdateModal from "../BookingUpdateModal";
import { getTransactions } from "../../store/transactions";

function reformatDate(date) {
    let newDate = new Date(date).toLocaleDateString('en-US', {
        timeZone: 'UTC',
    }).replace(/\//g, '-');
    return newDate;
}

const BookingsDetailPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const bookings = useSelector((state) => state.bookings)
    const transactions = useSelector((state) => state.transactions)
    const {closeMenu} = useModal();

    useEffect(() => {
        if (!bookings.user_id) {
            dispatch(getUserBookings());
            dispatch(getTransactions())
        }
    }, [dispatch, bookings, transactions])


    const { bookingId } = useParams();
    let payment_method;

    for (let el of transactions.transactionObjs) {
        if(bookingId == el.booking_id) {
            payment_method = el.payment_method;
            break
        }
    }

    let date

    for (let el of bookings.user_bookings) {
        if(el.id == bookingId) {
            date = el.appointment_date;
        }
    }

    let displayBool = false;

    if (new Date().getTime() > new Date(date).getTime()) {
        displayBool = true;
    }

    let ownedBooking = false;
    let booking;

    for (let el of bookings.user_bookings) {
        if (el.id == bookingId) {
            booking = el;
            ownedBooking = true;
        }
    }

    if (ownedBooking) {
        return (
            <div className="bookingdetailcontainer">
                <div className="signupformMod3">
                    <h2 className="h1title">Your Booking for {reformatDate(booking.appointment_date)}</h2>
                    <h2>Car Type</h2>
                    <div className="displayText">
                        {booking.car_type}
                    </div>
                    <h2>Service Type</h2>
                    <div className="displayText">
                        {booking.service_type.replace('_', ' ')}
                    </div>
                </div>
                <div className='bookingManagementButtonContainer'>
                    <OpenModalButton
                        className='withdrawbutton'
                        buttonText="Request Refund"
                        onItemClick={closeMenu}
                        modalComponent={
                            <DeleteFormModal
                                bookingId={booking.id}
                                car_type={booking.car_type}
                                service_type={booking.service_type}
                            />
                        }
                        hidden = {displayBool}
                    />
                    <OpenModalButton
                        className='withdrawbutton'
                        buttonText="Update Booking"
                        onItemClick={closeMenu}
                        modalComponent={
                            <BookingUpdateModal
                                bookingId={booking.id}
                                car_type={booking.car_type}
                                service_type={booking.service_type}
                                appointment_date={booking.appointment_date}
                                user={user}
                                payment_method={payment_method}
                                bookings = {bookings}
                            />
                        }
                        hidden = {new Date().getTime() >= new Date(booking.appointment_date).getTime() ? true : false}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <Redirect to='/'></Redirect>
        )
    }

}

export default BookingsDetailPage;
