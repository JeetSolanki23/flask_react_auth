import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from "../api";

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }
    const res = await apiFetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      navigate("/");
    } else {
      setError(data.msg || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input name="name" className="w-full mb-3 p-2 border rounded" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" className="w-full mb-3 p-2 border rounded" placeholder="Email" onChange={handleChange} required />
        <input name="phone" className="w-full mb-3 p-2 border rounded" placeholder="Phone" onChange={handleChange} required />
        <input name="password" type="password" className="w-full mb-3 p-2 border rounded" placeholder="Password" onChange={handleChange} required />
        <input name="confirmPassword" type="password" className="w-full mb-3 p-2 border rounded" placeholder="Confirm Password" onChange={handleChange} required />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Signup</button>
        <p className="mt-4 text-sm text-center">Already have an account? <a href="/" className="text-blue-500 hover:underline">Login</a></p>
      </form>
    </div>
  );
};

export default Signup;
