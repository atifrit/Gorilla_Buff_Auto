import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../store/bookings";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './user_booking_page.css';

const BookingsPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const bookings = useSelector((state) => state.bookings)

    console.log('bookings.user_id: ', bookings.user_id);

    useEffect(() => {
        if(!bookings.user_id) {
            dispatch(getUserBookings());
        }
    }, [dispatch, bookings])

    console.log('bookings: ', bookings)

    return (
        <>
            <div className='user_bookings_page_container'>
                {bookings.user_bookings.map((booking) => {
                    return (
                        <div className='bookingDetail'>
                            <Link
                                to={`/bookings/${booking.id}`}>{booking.id}</Link>
                        </div>
                    )
                })}
            </div>
        </>
    )


}



export default BookingsPage
