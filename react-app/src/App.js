import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import BookingsPage from './components/BookingsPage';
import CreateCarForm from './components/CreateCarForm';
import BookingsDetailPage from "./components/BookingDetailPage";
import LandingPage from "./components/LandingPage";
import UserDetails from "./components/UserDetails";
import CreateBookingForm from "./components/CreateBookingPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector((state) => state.session.user);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/profilepage'>
            {user ? <UserDetails /> : <Redirect to='/login'></Redirect>}
          </Route>
          <Route path='/bookings/:bookingId(\d+)'>
            {user ? <BookingsDetailPage /> : <Redirect to='/login'></Redirect>}
          </Route>
          <Route path='/bookings/new'>
            {user ? <CreateBookingForm /> : <Redirect to='/login'></Redirect>}
          </Route>
          <Route path='/cars/new'>
            {user ? <CreateCarForm /> : <Redirect to='/login'></Redirect>}
          </Route>
          <Route path='/bookings'>
            {user ? <BookingsPage /> : <Redirect to='/login'></Redirect>}
          </Route>
          <Route path='/'>
            <LandingPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
