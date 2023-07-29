import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/FormCSS.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Google from "../assets/google.png";
import Github from "../assets/github-mark-white.png";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../redux/users/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { resetLoginError } from "../redux/users/user.actions";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginAttempted, setLoginAttempted] = useState(false);

  useEffect(() => {
    if (loginAttempted) {
      if (error === "Request failed with status code 401") {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setErrorMessage("");
        navigate("/");
      }
    }
  }, [loginAttempted, error]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    dispatch(resetLoginError());
    const email = evt.target.email.value;
    const password = evt.target.password.value;

    await dispatch(authLogin(email, password));
    setLoginAttempted(true);
  };

  return (
    <div id="formContainer">
      {errorMessage && <h1 id="errorLogin">{errorMessage}</h1>}
      <h1 id="formHeading">Login</h1>
      <div className="d-grid gap-2 col-6 mx-auto">
        <a
          href="https://ticket-wing-man-backend.vercel.app/
auth/google"
          type="button"
          className="btn btn-primary btn-lg"
        >
          <img src={Google} alt="" className="google-button-icon" />
          <label className="google-button-text"> Login with Google</label>
        </a>
        <a
          href="https://ticket-wing-man-backend.vercel.app/
auth/github"
          type="button"
          className="btn btn-primary btn-lg"
        >
          <img src={Github} alt="" className="google-button-icon" />
          <label className="google-button-text"> Login with Github</label>
        </a>
      </div>
      <br />
      <div className="center">
        <div className="line">
          <div className="or">OR</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="name@example.com"
            name="email"
            required
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            name="password"
            required
          />
          <label htmlFor="floatingInput">Password</label>
        </div>
        <Link
          to="/forgot"
          id="forgotPasswordNav"
          className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
        >
          Forgot Password?
        </Link>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button type="submit" className="btn btn-primary btn-lg">
            Login
          </button>
        </div>
      </form>
      <Link
        to="/signup"
        id="signupNav"
        className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
      >
        New? Sign Up
      </Link>
    </div>
  );
};

export default LoginForm;
