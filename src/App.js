import React, { useState } from 'react';
import './App.css'; // Import CSS file
import {SignUp} from './pages/login-signup/signup.js';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Define the User model
class User {
  constructor(id, username, email,ProhibitedProductTypes
    , password, role, image, phoneNumber, verified) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.ProhibitedProductTypes = ProhibitedProductTypes;
    this.password = password;
    this.role = role;
    this.image = image;
    this.phoneNumber = phoneNumber;
    this.verified = verified;
  }

  static fromJson(json) {
    return new User(
      json._id,
      json.Username,
      json.Email,
      json.Password,
      json.ProhibitedProductTypes,
      json.Role,
      json.image,
      json.PhoneNumber,
      json.Verified
    );
  }
}
const navigateToSignUp = () => {
  console.log("success");
  window.location.href = "/signup"; // Navigate to the sign-up page directly
};



function LoginForm(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div>
      <input
        type="text"
        placeholder="Username/Email"
        value={props.username}
        onChange={(e) => props.setUsername(e.target.value)}
      />
      <br />
      <div className="password-input">
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
        />
        <label className="password-toggle">
          <input
            type="checkbox"
            checked={passwordVisible}
            onChange={() => setPasswordVisible(!passwordVisible)}
          />
          <span>Show Password</span>
        </label>
      </div>
      <br />
      <button onClick={props.handleLogin}>Login</button>
    </div>
  );
}

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please enter both username/email and password');
      return;
    }

    try {
      const response = await AuthService.signIn(username, password);
      console.log('Response:', response);
      if (response.status === 200) {
        const userData = await response.json();
        const user = User.fromJson(userData); 
        console.log(user);
        // Additional control for user role
        if (user.role !== 'partner' && user.role !== 'admin') {
          alert('This account is for our mobile application and for payments only');
          return;
        }

        alert('Login Successful!');
        // Handle successful login redirection or other actions here
      } else if (response.status === 404) {
        alert('User not found');
      } else if (response.status === 401) {
        alert('Invalid password');
      } else {
        alert('Failed to login. Please try again later.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>The Future For Kids Payment</h2>
        <img src="avatar_kids.png" alt="Avatar" />
        <br />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
        <div className="additional-text">
         <span onClick={navigateToSignUp}>Don't have an account?</span>
          <br />
          <span>Forgot password?</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

// AuthService implementation
const AuthService = {
  signIn: async (username, password) => {
    try {
      const response = await fetch('http://localhost:9090/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: username, password }),
      });
      return response;
    } catch (error) {
      throw new Error('Failed to sign in');
    }
  },
};