import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { getUserBookings } from "../../store/bookings";
import { getTransactions } from "../../store/transactions";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      dispatch(getUserBookings())
      dispatch(getTransactions())
    }
  };

  const handleDemoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'))
    if(data) {
      setErrors(data);
    } else {
      dispatch(getUserBookings())
      dispatch(getTransactions())
    }
  }

  return (
    <div className="signUpContainer">
      <h1>Log In</h1>
      <form className="signupform" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <input
            placeholder="Email"
            className='signupFormInput'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Password"
            className='signupFormInput'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button disabled={email.length == 0 || password.length == 0} className="signupbutton" type="submit">Log In</button>
      </form>
      <button className='demoUserButton' onClick={handleDemoUser}>Demo User</button>
    </div>
  );
}

export default LoginFormPage;
