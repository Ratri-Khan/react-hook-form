// import React from 'react';
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import "./Login.css";
import { AuthContext } from "../../providers/AuthProviders";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true })
        console.log(user);
        form.reset();
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          setError("Email Or Password Wrong");
        }
      });
  };
  return (
    <div className="hero min-h-screen backgroundImg">
      <div className="hero-content">
        <div className="wrapper">
          <h1>Login</h1>
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <input
                type="email"
                placeholder="email"
                name="email"
                className="inputBox"
                required
              />
              <MdAccountCircle className="icon" />
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="password"
                className="inputBox"
                name="password"
                required
              />
              <FaLock className="icon" />
            </div>
            <p className="font-bold text-yellow-500">{error}</p>

            <div className="form-control mt-6  text-center">
              <button className="inputBox">Login</button>
            </div>

            <p>
              New Here?{" "}
              <span className="font-bold">
                <Link to="/signUp">Sign Up</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
