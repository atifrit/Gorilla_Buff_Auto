import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../store/bookings";
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";




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
        <img className='landing-image' src={"https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_invest__91b9077cf4788b508a013b9dda8c3ffe4d4fff969655c212a0201c9533237d46.png"} />
        <div className='title-container'>
          <div className='title-text'>Welcome to Canaryhood</div>
          <div className='sub-title-text'>Join a new generation of investors</div>
        </div>
      </div>
    </div>
    )
}

export default LandingPage;
