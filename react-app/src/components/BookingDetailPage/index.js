import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../store/bookings";
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";

import './BookingDetailPage.css'


const BookingsDetailPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const bookings = useSelector((state) => state.bookings)

    useEffect(() => {
        if (!bookings.user_id) {
            dispatch(getUserBookings());
        }
    }, [dispatch, bookings])


    const { id } = useParams();

    let ownedBooking = false;
    let booking;

    console.log('bookings: ', bookings);

    for (let el of bookings.user_bookings) {
        if(bookings.id === id) {
            booking = el;
            ownedBooking = true;
        }
    }

    if(ownedBooking) {
        return (
            <>
                <div>
                    <h2>Your Booking for {booking.appointment_date}</h2>
                    <div>
                        {booking.car_type}
                        {booking.service_type}
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

export default BookingsDetailPage;
