import React, { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
      logOut()
        .then(() => {})
        .then((error) => {
          console.log(error);
        });
    };
  return (
    <div className="navbar bg-violet-200 text-slate-700 font-bold">
      <div className="navbar-start">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/secret">Secret</Link>
          </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Form</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/secret">Secret</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div
            onClick={handleLogout}
            className="mx-6 flex flex-col  justify-center items-center cursor-pointer"
          >
            <img
              src={user.photoURL}
              alt=""
              className="h-[60px] w-[60px] border border-white rounded-full"
            />
            <p className="text-xs"> logout</p>
          </div>
        ) : (
          <Link to="/login">
            <div className="mx-6 flex flex-col  justify-center items-center">
              <FaUserCircle className="text-3xl" />
              <p className="text-xs"> Account</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
