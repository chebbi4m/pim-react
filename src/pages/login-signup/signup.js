import * as React from 'react';
import './signup.css'
import user_icon from '../../assets/person.png'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import phone_icon from '../../assets/phone.png'
import { useState } from 'react';
import { registerPartenaire } from '../../services/partnerServices.js';

export function SignUp() {
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Password: '',
    PhoneNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation checks
    if (formData.PhoneNumber.length < 8) {
      alert('Phone number should be at least 8 digits long.');
      return;
    }
    
    if (formData.Password.length < 8) {
      alert('Password should be at least 8 characters long.');
      return;
    }
  
    // Additional validation if you want to ensure PhoneNumber contains only numbers
    if (!/^\d+$/.test(formData.PhoneNumber)) {
      alert('Phone number should contain only numbers.');
      return;
    }
  
    try {
      const response = await registerPartenaire(formData);
      console.log('Registration successful:', response);
      alert('Account created with success');
    } catch (error) {
      console.error('Registration failed:', error.message);
      // Optionally, you can display an error message to the user
    }
  };
  
  
  return(
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={user_icon} alt=""/>
          <input 
            type="text" 
            name="Username"
            value={formData.Username}
            onChange={handleInputChange}
            placeholder='Name'/>
        </div>
        <div className='input'>
          <img src={email_icon} alt=""/>
          <input 
            type="email" 
            name="Email"
            value={formData.Email}
            onChange={handleInputChange}
            placeholder='Email'/>
        </div>
        <div className='input'>
          <img src={phone_icon} alt=""/>
          <input 
            type="tel" 
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleInputChange}
            placeholder='Phone Number'/>
        </div>
        <div className='input'>
          <img src={password_icon} alt=""/>
          <input 
            type="password" 
            name="Password"
            value={formData.Password}
            onChange={handleInputChange}
            placeholder='Password'/>
        </div>
      </div>
      <div className='login'>Already have an account? <span>click here to login</span></div>
      <div className='submit__container'>
        <div className='submit' onClick={handleSubmit}>Sign Up</div>
      </div>
    </div>
  );
}
