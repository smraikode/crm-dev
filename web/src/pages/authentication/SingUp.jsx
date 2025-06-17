
// src/components/RegisterPage.jsx
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/teachers/register/",
        data
      );
      console.log("Registration Success:", response.data);
      alert("User registered successfully!");
      reset();
    } catch (error) {
      console.error("Registration Failed:", error.response?.data || error.message);
      alert("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        {/* Mobile Input */}
        <input
          type="tel"
          placeholder="Mobile"
          {...register("mobile", {
            required: "Mobile is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Mobile number must be 10 digits",
            },
          })}
          className="w-full p-2 border rounded"
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm">{errors.mobile.message}</p>
        )}

        {/* Address Input */}
        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: "Address is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
