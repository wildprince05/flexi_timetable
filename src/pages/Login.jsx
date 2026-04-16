import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.setItem('role', res.data.role);
      
      if (res.data.role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else if (res.data.role === 'ROLE_STUDENT') {
        navigate('/student');
      } else if (res.data.role === 'ROLE_FACULTY') {
        navigate('/faculty');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#f4f6fa]">
      <div className="w-full max-w-md rounded-lg shadow-md bg-white p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Flexi Timetable Login</h2>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0d6efd] text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
