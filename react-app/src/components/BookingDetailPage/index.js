import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../store/bookings";
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteFormModal from "../DeleteFormModal";
import './BookingDetailPage.css'

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

    useEffect(() => {
        if (!bookings.user_id) {
            dispatch(getUserBookings());
        }
    }, [dispatch, bookings])


    const { bookingId } = useParams();
    console.log('bookingId:', bookingId)

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
            <>
                <div>
                    <h2>Your Booking for {reformatDate(booking.appointment_date)}</h2>
                    <h3>Car Type</h3>
                    <div>
                        {booking.car_type}
                    </div>
                    <h3>Service Type</h3>
                    <div>
                        {booking.service_type.replace('_', ' ')}
                    </div>
                </div>
                <div className='bookingManagementButtonContainer'>
                    <OpenModalButton
                        className='openDeleteModal'
                        buttonText="Request Refund"
                        onItemClick={closeMenu}
                        modalComponent={
                            <DeleteFormModal
                                bookingId={booking.id}
                            />
                        }
                    />
                </div>
            </>
        )
    } else {
        return (
            <Redirect to='/'></Redirect>
        )
    }

}

export default BookingsDetailPage;
