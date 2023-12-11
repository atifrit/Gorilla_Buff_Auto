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
    <div className="signUpContainer">
      <h1>Sign Up</h1>
      <form className="signupform" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
        </ul>
        <div>
          <p className="errorsMod">{email.length < 4 && email.length > 0 ? 'email must be greater than 4 characters' : null}</p>
          <p className="errorsMod">{email.length > 50 ? 'email must be less than 50 characters' : null}</p>
          <p className="errorsMod">{username.length < 4 && username.length > 0 ? 'username must be greater than 4 characters' : null}</p>
          <p className="errorsMod">{username.length > 50 ? 'username must be less than 50 characters' : null}</p>
          <p className="errorsMod">{password.length < 8 && password.length > 0 ? 'password must be at least 8 characters' : null}</p>
          <p className="errorsMod">{password.length > 50 ? 'password must be less than 50 characters' : null}</p>
        </div>
        <label>
          <input
            placeholder="Email"
            className="signupFormInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Username"
            className="signupFormInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Password"
            className="signupFormInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Confirm Password"
            className="signupFormInput"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className="signupbutton" type="submit" disabled={email.length < 4 || email.length > 50 || username.length < 4 || username.length > 50 || password.length < 8 || password.length > 50}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
