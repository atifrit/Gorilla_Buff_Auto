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
                <img className='landing-image' src={"https://www.spotfreecar.com/wp-content/uploads/2022/05/los-angeles-car-wash-package-memberships-570x420.jpg"} />
                <div className='title-container'>
                    <div className='title-text'>Gorilla Buff Auto Detailing</div>
                    <div className='sub-title-text'>Showroom quality service for your valued ride</div>
                </div>
                <img className='landing-image' src={"https://www.godetail.com/wp-content/uploads/2023/01/can-car-wash-damage-brakes.jpg"} />
            </div>
        </div>
    )
}

export default LandingPage;
