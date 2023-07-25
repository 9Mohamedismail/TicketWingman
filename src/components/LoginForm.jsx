import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/FormCSS.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Google from "../assets/google.png";
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
      <div class="d-grid gap-2 col-6 mx-auto">
        <a
          href="http://localhost:8080/auth/google"
          type="button"
          class="btn btn-primary btn-lg"
        >
          <img src={Google} alt="" className="google-button-icon" />
          <label className="google-button-text"> Login with Google</label>
        </a>
      </div>
      <br />
      <div className="center">
        <div className="line">
          <div className="or">OR</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="form-floating mb-3">
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="name@example.com"
            name="email"
            required
          />
          <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            name="password"
            required
          />
          <label for="floatingInput">Password</label>
        </div>
        <Link
          to="/forgot"
          id="forgotPasswordNav"
          class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
        >
          Forgot Password?
        </Link>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button type="submit" class="btn btn-primary btn-lg">
            Login
          </button>
        </div>
      </form>
      <Link
        to="/signup"
        id="signupNav"
        class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
      >
        New? Sign Up
      </Link>
    </div>
  );
};

export default LoginForm;
