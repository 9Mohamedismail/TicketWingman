import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk } from "../redux/users/user.actions";
import "../css/UserProfileCSS.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function EditInfo() {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const [userData, setUserData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    newPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUserData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.newPassword,
    };

    console.log("Updated User Data:", updatedUserData);
    dispatch(editUserThunk(currentUser.email, updatedUserData));

    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      newPassword: "",
    });
    setVisible(false);

    navigate("/profile/");
  };

  return (
    <div id="profileContainer">
      <img
        id="userProfilePicture"
        src="https://cdn-icons-png.flaticon.com/512/3502/3502768.png"
        class="rounded mx-auto d-block"
      />
      <form>
        <div class="mb-3">
          <label id="profileFirstName" class="form-label col-form-label-lg">
            First Name
          </label>
          <input
            id="profileFirstNameInput"
            type="text"
            name="firstName"
            class="form-control form-control-lg"
            placeholder="First name"
            value={userData.firstName}
            onChange={handleChange}
          />
          <div>
            <label id="profileLastName" class="form-label col-form-label-lg">
              Last Name
            </label>
            <input
              id="profileLastNameInput"
              type="text"
              name="lastName"
              class="form-control form-control-lg"
              placeholder="Last name"
              value={userData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label col-form-label-lg">Email</label>
          <input
            id="profileEmailInput"
            type="email"
            name="email"
            class="form-control form-control-lg"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div class="mb-1">
          <label class="form-label col-form-label-lg">Password</label>
          <input
            id="profilePasswordInput"
            type={visible ? "text" : "password"}
            name="newPassword"
            class="form-control form-control-lg"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <div class="mb-2">
          <button
            type="button"
            class="btn btn-light btn-sm"
            onClick={() => setVisible(!visible)}
          >
            <i class="bi bi-eye" /> Show Password
          </button>
        </div>
        <div>
          <button type="submit" class="btn btn-success" onClick={handleSubmit}>
            <i class="bi bi-pen"></i> Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditInfo;
