import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = {
    displayName: "Emon Shimoul",
    photoURL: "https://i.ibb.co.com/4fsbvS1/Virat-Kohli.webp",
  };
  //   const user = null;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8">
      {/* Mobile Menu Button */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/camps">Available Camps</Link>
            </li>
            {!user && (
              <li>
                <Link to="/join">Join Us</Link>
              </li>
            )}
          </ul>
        </div>

        {/* Logo and Website Name */}
        <Link to="/" className="flex items-center gap-2 ml-2">
          {/* <img src="/logo.png" alt="Logo" className="w-10 h-10" /> */}
          <span className="text-xl font-bold text-primary">MedCamp</span>
        </Link>
      </div>

      {/* Center Menu for Desktop/Tablet */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 text-base font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/camps">Available Camps</Link>
          </li>
        </ul>
      </div>

      {/* Right Side: Profile or Join Button */}
      <div className="navbar-end">
        {!user ? (
          <Link
            to="/join"
            className="btn btn-primary btn-sm hidden md:inline-flex"
          >
            Join Us
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-500" />
                )}
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                <div className="px-4 py-2 text-gray-700 font-semibold">
                  {user.displayName}
                </div>
                <hr />
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    // your logout function here
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
