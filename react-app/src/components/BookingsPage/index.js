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
            <h2>Upcoming Appointments</h2>
                <div className='upcoming_appointments'>
                {bookings.user_bookings.map((booking) => {
                    if (new Date().getTime() < new Date(booking.appointment_date).getTime()) {
                        return (
                            <div className='bookingDetail'>
                                <Link
                                    to={`/bookings/${booking.id}`}><div>{booking.appointment_date} {booking.car_type} {booking.servive_type}</div></Link>
                            </div>
                        )
                    } else return null
                })}
                </div>
                <h2>Past Appointments</h2>
                <div className="past_bookings">
                {bookings.user_bookings.map((booking) => {
                    if (new Date().getTime() >= new Date(booking.appointment_date).getTime()) {
                        return (
                            <div className='bookingDetail'>
                                <Link
                                    to={`/bookings/${booking.id}`}><div>{booking.appointment_date} {booking.car_type} {booking.servive_type}</div></Link>
                            </div>
                        )
                    } else return null
                })}
                </div>
            </div>
        </>
    )


}



export default BookingsPage
