import React, { useContext } from "react";
import "./navbar.css";
import instalogo from "../img/logo.png";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

function Navbar({ login }) {
  const { setModalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/profile">
            <li key="profile">Profile</li>
          </Link>
          <Link to="/createPost">
            <li key="createpost">Create Post</li>
          </Link>
          <Link to={""}>
            <button className="primaryBtn" onClick={() => setModalOpen(true)}>
              Log Out
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signin">
            <li key="signin">Sign in</li>
          </Link>
          <Link to="/signup">
            <li key="signup">Sign Up</li>
          </Link>
        </>,
      ];
    }
  };
  loginStatus();
  return (
    <div className="nav-container">
      <img src={instalogo} alt="INSTAGRAM" />
      <ul className="nav-menu">{loginStatus()}</ul>
    </div>
  );
}

export default Navbar;
