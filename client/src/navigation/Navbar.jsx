import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-blue-700 ">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Hamburger Menu for Small Screens */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-blue-400 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-white font-bold" : "text-white"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/donation"
                  className={({ isActive }) =>
                    isActive ? "text-white font-bold" : "text-white"
                  }
                >
                  Donation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/volunteer"
                  className={({ isActive }) =>
                    isActive ? "text-white font-bold" : "text-white"
                  }
                >
                  Volunteer
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/crisis"
                  className={({ isActive }) =>
                    isActive ? "text-white font-bold" : "text-white"
                  }
                >
                  Crisis Management
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <NavLink to="/" className="btn btn-ghost text-xl text-white">
            CrisisConnect
          </NavLink>
        </div>

        {/* Navbar Center for larger screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-white font-bold" : "text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/donation"
                className={({ isActive }) =>
                  isActive ? "text-white font-bold" : "text-white"
                }
              >
                Donation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/volunteer"
                className={({ isActive }) =>
                  isActive ? "text-white font-bold" : "text-white"
                }
              >
                Volunteer
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/crisis"
                className={({ isActive }) =>
                  isActive ? "text-white font-bold" : "text-white"
                }
              >
                Crisis
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/management"
                className={({ isActive }) =>
                  isActive ? "text-white font-bold" : "text-white"
                }
              >
                Management
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex justify-end gap-5">
          <div>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-blue btn" : "text-blue btn"
              }
            >
              Login/Register
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/adminLogin"
              className={({ isActive }) =>
                isActive ? "text-blue btn" : "text-blue btn"
              }
            >
              Admin Login/Registration
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
