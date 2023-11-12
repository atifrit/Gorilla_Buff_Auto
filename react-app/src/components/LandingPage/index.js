import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../store/bookings";
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";

import './LandingPage.css';


const LandingPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const bookings = useSelector((state) => state.bookings)


    return (
        <div className='landing-page'>
            <div className='nav'>
                {/* <Navigation /> */}
            </div>
            <div className='landing-container'>
                <div className='title-container'>
                    <div className='title-text'>Gorilla Buff Auto Detailing</div>
                    <div className='sub-title-text'>Showroom quality service for your valued ride</div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
