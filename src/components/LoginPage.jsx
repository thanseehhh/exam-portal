import React, { useState } from 'react';
// import { useHist} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css.css'

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate a login action (replace with actual authentication logic)
    localStorage.setItem('user', JSON.stringify({ username, role: 'student' }));
    Naviagte.push('/student-dashboard');
  };

  return (
    <div className="login-container">
     <div className='h2login'>
     <h2>Login</h2>
      </div> 
      
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
          </form>
          
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <button type="submit">Login</button>
      <p>Don't have an account? <a href="/register">Register</a></p> {/* Link to Register Page */}
    </div>
  );
}

export default LoginPage;
