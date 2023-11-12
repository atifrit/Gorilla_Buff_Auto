import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDates, getUserBookings } from "../../store/bookings";
import { Link, Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './user_booking_page.css';
import { getTransactions } from "../../store/transactions";

function reformatDate(date) {
    let newDate = new Date(date).toLocaleDateString('en-US', {
        timeZone: 'UTC',
    }).replace(/\//g, '-');
    return newDate;
}


const handleClick = () => {

    return (<Redirect to='/bookings/new' />)
}

const BookingsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    const bookings = useSelector((state) => state.bookings)

    useEffect(() => {
        if (!bookings.user_id) {
            dispatch(getUserBookings());
            dispatch(getTransactions())
            dispatch(getAllDates());
        }
    }, [dispatch, bookings])

    return (
        <>
            <div className='user_bookings_page_container'>
                <div className='signupformMod'>
                <h2>Upcoming Appointments</h2>
                    {bookings.user_bookings.map((booking) => {
                        if (new Date().getTime() < new Date(booking.appointment_date).getTime()) {
                            return (
                                <div className='bookingDetail'>
                                    <Link
                                        className='displayLinks' to={`/bookings/${booking.id}`}><div>{reformatDate(booking.appointment_date)} {booking.car_type}</div></Link>
                                </div>
                            )
                        } else return null
                    })}
                </div>
                <div className="signupformMod">
                <h2>Past Appointments</h2>
                    {bookings.user_bookings.map((booking) => {
                        if (new Date().getTime() >= new Date(booking.appointment_date).getTime()) {
                            return (
                                <div className='bookingDetail'>
                                    <Link
                                        className='displayLinks' to={`/bookings/${booking.id}`}><div>{reformatDate(booking.appointment_date)} {booking.car_type}</div></Link>
                                </div>
                            )
                        } else return null
                    })}
                </div>
            <button className='withdrawbutton' onClick={(e) => { history.push(`/bookings/new`) }}>Make an Appointment</button>
            </div>

        </>
    )


}



export default BookingsPage
