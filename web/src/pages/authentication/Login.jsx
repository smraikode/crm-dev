import axios from "axios";
import React, { useState } from "react";
import { apiEndpoints } from "../../services/apiConfig";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});

  const [registerForm, setRegisterForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });
  const [registerErrors, setRegisterErrors] = useState({});

  const handleLoginChange = (e) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setLoginErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleRegisterChange = (e) => {
    setRegisterForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setRegisterErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };


  const validateLogin = () => {
    const errors = {};

    if (!loginForm.email) {
      errors.email = "Username (email) is required";
    } else {
      // Email format regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginForm.email)) {
        errors.email = "Invalid email format";
      }
    }

    if (!loginForm.password) {
      errors.password = "Password is required";
    }

    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate register fields
  const validateRegister = () => {
    const errors = {};

    if (!registerForm.name.trim()) {
      errors.name = "First Name is required";
    }
    if (!registerForm.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!registerForm.email) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registerForm.email)) {
        errors.email = "Invalid email format";
      }
    }

    if (!registerForm.phone) {
      errors.phone = "Phone number is required";
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(registerForm.phone)) {
        errors.phone = "Phone number must be 10 digits";
      }
    }

    if (!registerForm.password) {
      errors.password = "Password is required";
    } else if (registerForm.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!registerForm.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // if (!registerForm.role) {
    //   errors.role = "Role is required";
    // }

    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Login submit
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateLogin()) return;

    try {
      const res = await axios.post(apiEndpoints.login, loginForm);
      const { token } = res.data;
      if (token) {
        // Decode the JWT token to extract role
        const decoded = jwtDecode(token);
        // Store token and role
        localStorage.setItem("token", token); // store token in localStorage
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Login failed: Token not received");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  //handle register submit

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!validateRegister()) return;

    // Clone registerForm and remove confirmPassword before sending to backend
    const payload = { ...registerForm };
    delete payload.confirmPassword;

    try {
      const response = await axios.post(apiEndpoints.register, payload);
      console.log("Registration Success:", response.data);
      // alert("Registration successful! Please login.");
      toast.success("Registration successful! Please login.");

      setActiveTab("login");

      // Reset form
      setRegisterForm({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        //role: "",
      });
      setRegisterErrors({});
      navigate("/login");
    } catch (error) {
      console.error("Registration Failed:", error.response?.data || error.message);
      toast.error(`Registration Failed: "${error.response?.data?.detail || error.message}"`);

      // alert("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-6">
          {/* <img src="..." alt="Logo" className="h-28 mb-2" /> */}
          <h1 className="text-4xl font-bold text-orange-600">CarNation</h1>
          <span className="text-base text-gray-500 font-medium tracking-wide">
            CRM
          </span>
        </div>

        <p className="text-center text-gray-600 font-medium mb-3">
          {activeTab === "login"
            ? "Login to your account to continue"
            : "Create an account to get started"}
        </p>

        {/* Tabs */}
        <div className="grid grid-cols-2 bg-gray-100 rounded-md p-1 mb-6 text-sm font-semibold text-gray-500">
          <button
            className={`py-2 rounded-md transition-all duration-200 ${activeTab === "login" ? "bg-white text-black shadow" : ""
              }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`py-2 rounded-md transition-all duration-200 ${activeTab === "register" ? "bg-white text-black shadow" : ""
              }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Forms */}
        {activeTab === "login" ? (
          <form className="space-y-4" onSubmit={handleLoginSubmit} noValidate>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="Enter your email"
                required
                className={`w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${loginErrors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                  }`}
              />
              {loginErrors.email && (
                <p className="text-red-500 text-sm mt-1">{loginErrors.email}</p>
              )}
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
                required
                className={`w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${loginErrors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                  }`}
              />
              {loginErrors.password && (
                <p className="text-red-500 text-sm mt-1">{loginErrors.password}</p>
              )}
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
          <form className="space-y-4" onSubmit={handleRegisterSubmit} noValidate>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  First Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  placeholder="First name"
                  required
                  className={`w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${registerErrors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                    }`}
                />
                {registerErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{registerErrors.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={registerForm.lastName}
                  onChange={handleRegisterChange}
                  placeholder="Last name"
                  required
                  className={`w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${registerErrors.lastName ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                    }`}
                />
                {registerErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{registerErrors.lastName}</p>
                )}
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
                onChange={handleRegisterChange}
                placeholder="Email address"
                required
                className={`w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${registerErrors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                  }`}
              />
              {registerErrors.email && (
                <p className="text-red-500 text-sm mt-1">{registerErrors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={registerForm.phone}
                onChange={handleRegisterChange}
                placeholder="Phone number"
                required
                maxLength={10}
                className={`w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${registerErrors.phone ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                  }`}
              />
              {registerErrors.phone && (
                <p className="text-red-500 text-sm mt-1">{registerErrors.phone}</p>
              )}
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
                  onChange={handleRegisterChange}
                  placeholder="Create a password"
                  required
                  className={`w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${registerErrors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                    }`}
                />
                {registerErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{registerErrors.password}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder="Confirm password"
                  required
                  className={`w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${registerErrors.confirmPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                    }`}
                />
                {registerErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{registerErrors.confirmPassword}</p>
                )}
              </div>
            </div>


            {/* <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Role
              </label>
              <select
                name="role"
                value={registerForm.role}
                onChange={handleRegisterChange}
                required
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${registerErrors.role ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                  }`}
              >
                <option value="">Select role</option>
                <option value="admin">Administrator</option>
                <option value="sales">Sales Team</option>
              </select>
              {registerErrors.role && (
                <p className="text-red-500 text-sm mt-1">{registerErrors.role}</p>
              )}
            </div> */}

            <button
              type="submit"
              className="w-full h-10 bg-orange-600 hover:bg-orange-700 transition text-white rounded-md font-semibold"
            >
              Create Account
            </button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                className="text-orange-600 font-medium cursor-pointer"
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
