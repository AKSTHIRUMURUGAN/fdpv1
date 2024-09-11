"use client";
import React, { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.error || "Something went wrong!");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-purple-150 ">
      <div className="fixed-inset-0">
        <img
          src="https://www.rajalakshmi.org/image/banner-1.jpg"
          alt="Rajalakshmi Engineering College"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-75"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      <div className="flex items-start justify-start">
        <img
          src="./logo2.png"
          alt="College Logo"
          className="h-20 transform transition-transform duration-500 ease-in-out hover:scale-110 bright"
        />
      </div>
      <div className="bg-white shadow-lg border border-purple-600 rounded-lg p-8 max-w-md w-full justify-center items-center mx-auto  transform transition-transform duration-500 ease-in-out hover:scale-105">
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
          REGISTER FORM
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-purple-700 ">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border rounded-md focus:ring-purple-500 focus:border-purple-600"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-purple-700 ">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md focus:ring-purple-500 focus:border-purple-600"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-purple-700 ">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md focus:ring-purple-500 focus:border-purple-600"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-purple-700 ">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 w-full border rounded-md focus:ring-purple-500 focus:border-purple-600"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white p-2 rounded-md hover:bg-purple-500 transition-colors duration-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
