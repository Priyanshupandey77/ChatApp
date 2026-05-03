import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await API.post("/auth/register", form);

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/chat");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.msg || "Error");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-300 px-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Create Account
      </h2>

      <p className="text-center text-sm text-gray-500">
        Join us and start chatting 🚀
      </p>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition text-sm"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        onChange={handleChange}
        className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition text-sm"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition text-sm"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-medium hover:bg-blue-600 transition shadow-sm"
      >
        Register
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-blue-600 font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  </div>
);
}

export default Register;
