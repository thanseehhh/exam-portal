import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  // Validate form fields
  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) return;

    // Create the user object (this can be sent to a backend API for registration)
    const user = {
      username,
      email,
      password,
    };

    // Simulate a registration API call (replace with actual API call)
    try {
      // Here you'd typically send the `user` object to your backend to register the user
      console.log('Registering user:', user);
      // On success, redirect to login page (or any other page as needed)
      history.push('/login');
    } catch (error) {
      setErrorMessage('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default RegisterPage;
