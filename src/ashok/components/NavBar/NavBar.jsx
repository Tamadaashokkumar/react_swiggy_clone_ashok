import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import "./style.css";
function NavBar() {
  const navigate = useNavigate();
  let cookie = Cookies.get("token");
  const { cartItems } = useCart();
  let cartLength = cartItems.length;

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const logOutHandler = () => {
    Cookies.remove("token");
    Cookies.remove("id");
    navigate("/auth");
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
          <div className="d-none d-lg-flex align-items-center ">
            {cookie ? (
              <>
                <Link to="/cart" className="d-flex mr-5 link ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="currentColor"
                    class="bi bi-cart4"
                    viewBox="0 0 16 16"
                    className="mr-2 "
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                  </svg>
                  <div className="font-weight-bold text-dark" id="count">
                    {cartLength === 0 ? null : cartLength}
                  </div>
                </Link>
                <button
                  className="nav-link btn btn-primary"
                  onClick={logOutHandler}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="nav-link btn btn-danger font-weight-bold"
                >
                  Login / Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Small devices - show User Icon */}
          <div className="d-lg-none position-relative ml-3 d-flex">
            <Link to="/cart" className="d-flex mr-5 link ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="currentColor"
                class="bi bi-cart4"
                viewBox="0 0 16 16"
                className="mr-2 "
              >
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
              </svg>
              <div className="font-weight-bold text-dark" id="count">
                {cartLength === 0 ? null : cartLength}
              </div>
            </Link>
            <FaUserCircle
              size={40}
              style={{ color: "#000", cursor: "pointer" }}
              onClick={toggleMenu}
            />

            {showMenu && (
              <div
                className="dropdown-menu dropdown-menu-right show mt-3"
                style={{ position: "absolute", right: 0 }}
              >
                {cookie ? (
                  <button
                    className="dropdown-item btn btn-light font-weight-bold "
                    onClick={logOutHandler}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/auth" className="dropdown-item font-weight-bold">
                      Login / Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
