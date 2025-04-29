import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function NavBar(props) {
  console.log(props);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-lg fixed-top p-3 mb-5">
      <div className="container d-flex justify-content-between align-items-center">
        <Link
          to="/"
          className="navbar-brand font-weight-bold"
          id="navbarLogo"
          style={{ fontSize: "28px" }}
        >
          Ashok
        </Link>

        <div className="d-flex align-items-center">
          {/* Large devices - show Login and SignUp buttons */}
          <div className="d-none d-lg-flex align-items-center">
            <a className="nav-link btn btn-primary" href="#">
              Login
            </a>
            <a className="btn btn-danger ml-3" href="#">
              Sign Up
            </a>
          </div>

          {/* Small devices - show User Icon */}
          <div className="d-lg-none position-relative ml-3">
            <FaUserCircle
              size={30}
              style={{ color: "#000", cursor: "pointer" }}
              onClick={toggleMenu}
            />

            {showMenu && (
              <div
                className="dropdown-menu dropdown-menu-right show mt-2"
                style={{ position: "absolute", right: 0 }}
              >
                <a className="dropdown-item" href="#">
                  Login
                </a>
                <a className="dropdown-item" href="#">
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
