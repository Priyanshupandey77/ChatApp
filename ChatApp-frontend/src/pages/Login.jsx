import { useState } from "react";
import API from "../api/axios";
import {Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/chat");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

 return (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <form
      onSubmit={handleLogin}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-5"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Welcome Back
      </h2>

      <p className="text-center text-sm text-gray-500">
        Login to continue chatting
      </p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition text-sm"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition text-sm"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-medium hover:bg-blue-600 transition shadow-sm"
      >
        Login
      </button>

      <p className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-medium hover:underline"
        >
          Signup
        </Link>
      </p>
    </form>
  </div>
);
}

export default Login;
