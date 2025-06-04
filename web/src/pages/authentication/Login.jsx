import axios from "axios";
import React, { useState } from "react";
import { apiEndpoints } from "../../services/apiConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleLoginChange = (e) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleRegisterChange = (e) => {
    setRegisterForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(apiEndpoints.login, loginForm);
      console.log("loginform", res.data);
      navigate("/");
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiEndpoints.register, registerForm);
      console.log("Registration Success:", response.data);
      // alert("User registered successfully!");
      navigate("/");
    } catch (error) {
      console.error(
        "Registration Failed:",
        error.response?.data || error.message
      );
      alert("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-6">
          {/* <img
            src="https://real-lead-master-mmsellworth.replit.app/assets/sellworth-logo-PBqSwQcL.jpg"
            alt="Sellworth Logo"
            className="h-28 mb-2"
          /> */}
          <h1 className="text-4xl font-bold text-orange-600">CarNation</h1>
          {/* <h3 className="text-3xl font-bold text-gray-800">Sellworth</h3> */}
          <span className="text-base text-gray-500 font-medium tracking-wide">
            CRM
          </span>
        </div>

        {/* Description */}
        <p className="text-center text-gray-600 font-medium mb-3">
          {activeTab === "login"
            ? "Login to your account to continue"
            : "Create an account to get started"}
        </p>

        {/* Tabs */}
        <div className="grid grid-cols-2 bg-gray-100 rounded-md p-1 mb-6 text-sm font-semibold text-gray-500">
          <button
            className={`py-2 rounded-md transition-all duration-200 ${
              activeTab === "login" ? "bg-white text-black shadow" : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`py-2 rounded-md transition-all duration-200 ${
              activeTab === "register" ? "bg-white text-black shadow" : ""
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Forms */}
        {activeTab === "login" ? (
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Username
              </label>
              <input
                type="text"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="Enter your username"
                className="w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="Enter your password"
                className="w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full h-10 bg-orange-600 hover:bg-orange-700 transition text-white rounded-md font-semibold"
            >
              Login
            </button>
            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <span
                className="text-orange-600 font-medium cursor-pointer"
                onClick={() => setActiveTab("register")}
              >
                Register
              </span>
            </p>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleRegisterSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  First Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={registerForm.name}
                  onChange={(e) => handleRegisterChange(e)}
                  placeholder="First name"
                  className="w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  className="w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={(e) => handleRegisterChange(e)}
                placeholder="Email address"
                className="w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Phone (optional)
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                className="w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                className="w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={(e) => handleRegisterChange(e)}
                  placeholder="Create a password"
                  className="w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Role
              </label>
              <select
                name="role"
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select role</option>
                <option value="admin">Administrator</option>
                <option value="sales">Sales Team</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full h-10 bg-orange-600 hover:bg-orange-700 transition text-white rounded-md font-semibold"
            >
              Create Account
            </button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                className="text-orange-600 font-medium  cursor-pointer"
                onClick={() => setActiveTab("login")}
              >
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
