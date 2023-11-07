import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './Navigation.css';



function Navigation(){
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);


	const handleLogout = () => {
		dispatch(logout());
	  };
	return (
		<div className='nav-container'>
		<div className='left-container'>
		  <div className='logo-container'>
			<NavLink to="/" id='landing-logo'>
			  <img src={'https://static.vecteezy.com/system/resources/thumbnails/010/486/942/small/blue-car-wash-auto-detailing-logo-vector.jpg'} alt="logo" />
			</NavLink>
		  </div>
		  <div className='github-links'>
			<div className='github-developer'>
			  <a href="https://github.com/atifrit">
			  <div className='github'>
				<img
				  id="github-logo"
				  src={'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png'}
				  alt="github logo"
				></img>
			  <div className='github-text'>Adam Tifrit</div>
			  </div>
			  </a>
			</div>
		  </div>
		</div>
		<div className="right-nav-container">
		  {sessionUser ? (
			<><button onClick={handleLogout} className="login">
			  Logout
			</button>
			  <NavLink className="signup" to="/bookings">
				Bookings
			  </NavLink>
			  <NavLink className="signup" to="/profilepage">
				Profile Page
			  </NavLink>
			  </>

		  ) : (
			<>
			  <NavLink className="login" to="/login">
				Log in
			  </NavLink>
			  <NavLink className="signup" to="/signup">
				Sign up
			  </NavLink>
			</>
		  )}
		</div>
	  </div>


	);
}

export default Navigation;
