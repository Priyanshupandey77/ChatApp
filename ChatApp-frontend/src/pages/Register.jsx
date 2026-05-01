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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-100 to-green-300 px-3 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-xs sm:text-sm">
          Join us and get started 🚀
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm sm:text-base"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm sm:text-base"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm sm:text-base"
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2.5 sm:p-3 rounded-lg font-semibold transition duration-200 text-sm sm:text-base"
        >
          Register
        </button>

        <p className="text-center text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-green-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
