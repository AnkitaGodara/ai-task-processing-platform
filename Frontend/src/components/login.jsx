import { useState } from "react";

import API from "../api/axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      window.location.href =
        "/dashboard";
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="block mb-2 font-semibold">
          Email:
        </label>

        <input
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">
          Password:
        </label>

        <input
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
      </div>

      <button
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-lg font-semibold"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default Login;