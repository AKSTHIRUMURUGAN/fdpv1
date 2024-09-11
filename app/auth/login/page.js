"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.username, // Assuming username is email
          password: formData.password,
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        // Handle successful login (e.g., redirect to dashboard)
        // alert("Login successful");
        // Example: Redirect to dashboard
        router.push("/");
      } else {
        // Handle error response from server
        setErrorMessage(result.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("An error occurred during login");
    }
  };

  return (
    <div className="flex h-screen relative overflow-hidden bg-purple-300">
      <div className="flex bg-purple-300 opacity-85">
        <img
          src="https://www.rajalakshmi.org/image/banner-1.jpg"
          className="absolute object-cover h-full opacity-75"
          alt="college building"
        />
      </div>
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
      <div className="circle circle4"></div>
      <div className="circle circle5"></div>
      <div className="circle circle6"></div>

      <div className="flex items-start justify-start">
        <img
          src="./logo2.png"
          alt="College Logo"
          className="h-20 transform transition-transform duration-500 ease-in-out hover:scale-110 bright"
        />
      </div>

      {/* Login Form */}
      <div className="form-container bg-purple-400 flex align-middle items-end flex-col justify-center p-8 z-10 form-border bottom-0">
        <h1 className="text-3xl font-bold mb-6 text-purple-600 text-center">
          LOGIN
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-purple-700"
            >
              Username (or Email)
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border border-purple-300 rounded-md shadow-sm"
              placeholder="Enter your username or email"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-purple-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-purple-300 rounded-md shadow-sm"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* Background Image */}
      <div className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-300 via-gray-100 to-blue-300"></div>
    </div>
  );
};

export default LoginPage;
