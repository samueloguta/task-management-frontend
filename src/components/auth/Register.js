import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, form);
      console.log('✅ Registration Success:', res.data);
      alert('Registration successful!');
    } catch (err) {
      console.error('❌ Registration Failed:', err.response?.data || err.message);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
