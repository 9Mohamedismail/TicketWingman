import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignup } from "../redux/users/user.actions";
import { useNavigate } from "react-router-dom";
import "../css/FormCSS.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Google from "../assets/google.png";
import Github from "../assets/github-mark-white.png";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    const email = evt.target.email.value;
    const password = evt.target.password.value;

    dispatch(authSignup(firstName, lastName, email, password));
    navigate("/");
  };
  return (
    <div id="formContainer">
      <h1 id="formHeading">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="First name"
            name="firstName"
            required
          />
          <label for="floatingInput">First Name</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Last name"
            name="lastName"
            required
          />
          <label for="floatingInput">Last Name</label>
        </div>
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
        <div class="d-grid gap-2 col-6 mx-auto">
          <button type="submit" class="btn btn-primary btn-lg">
            Sign Up
          </button>
        </div>
      </form>
      <br />
      <div className="center">
        <div className="line">
          <div className="or">OR</div>
        </div>
      </div>
      <div class="d-grid gap-2 col-6 mx-auto">
        <a
          href="https://ticket-wing-man-backend.vercel.app/
auth/google"
          type="button"
          class="btn btn-primary btn-lg"
        >
          <img src={Google} alt="" className="google-button-icon" />
          <label className="google-button-text"> Login with Google</label>
        </a>
        <a
          href="https://ticket-wing-man-backend.vercel.app/
auth/github"
          type="button"
          class="btn btn-primary btn-lg"
        >
          <img src={Github} alt="" className="google-button-icon" />
          <label className="google-button-text"> Login with Github</label>
        </a>
      </div>
    </div>
  );
};

export default SignupForm;
