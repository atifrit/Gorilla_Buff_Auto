import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import { getUserBookings } from "../../store/bookings";
import { getTransactions } from "../../store/transactions";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        } else {
          dispatch(getUserBookings())
          dispatch(getTransactions())
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
        </ul>
        <p className="errors">{email.length < 4 && email.length > 0 ? 'email must be greater than 4 characters': null}</p>
        <p className="errors">{email.length > 50 ? 'email must be less than 50 characters': null}</p>
        <p className="errors">{username.length < 4 && username.length > 0 ? 'username must be greater than 4 characters': null}</p>
        <p className="errors">{username.length > 50 ? 'username must be less than 50 characters': null}</p>
        <p className="errors">{password.length < 8 && password.length > 0 ? 'password must be at least 8 characters': null}</p>
        <p className="errors">{password.length > 50 ? 'password must be less than 50 characters': null}</p>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
