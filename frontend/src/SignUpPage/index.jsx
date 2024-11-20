import React, { useState } from 'react';
import axios from 'axios';
import { apiurl } from '../global/Api.jsx';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [profileImage, setProfileImage] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to request OTP
  const requestOtp = async () => {
    try {
      const response = await axios.post(`${apiurl}/users/requestOpt`, { email });
      setIsOtpSent(true);
      setError('');
      setSuccess('OTP has been sent to your email');
    } catch (error) {
      setError('Error requesting OTP');
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    try {
      await axios.post(`${apiurl}/users/verifyOpt`, { email, otp });
      setIsEmailVerified(true);
      setSuccess('Email verified successfully');
      setError('');
    } catch (error) {
      setError('Invalid OTP or verification failed');
    }
  };

  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!isEmailVerified) {
      setError('Please verify your email before registering');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await axios.post(`${apiurl}/users/register`,formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(response.data.message);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleRegister} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {!isOtpSent && (
            <button
              type="button"
              onClick={requestOtp}
              className="w-full py-2 bg-blue-500 text-white rounded-lg mt-2 hover:bg-blue-600 focus:outline-none"
            >
              Send OTP
            </button>
          )}

          {isOtpSent && !isEmailVerified && (
            <div className="mb-4">
              <label className="block text-gray-700">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={verifyOtp}
                className="w-full py-2 bg-green-500 text-white rounded-lg mt-2 hover:bg-green-600 focus:outline-none"
              >
                Verify OTP
              </button>
            </div>
          )}

          {isEmailVerified && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Profile Image</label>
                <input
                  type="file"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white rounded-lg mt-2 hover:bg-green-600 focus:outline-none"
              >
                Register
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
