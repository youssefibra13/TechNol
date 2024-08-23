import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('');
  const navigate = useNavigate();

  axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 300; // default
};

  const handleInputChange = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}

    })
  }

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/users/register`, userData);
      const newUser = response.data;
      //console.log(newUser); // Debug log
      if (!newUser) {
        setError("Couldn't register user. Please try again.")
      }
      navigate('/login');
    } catch (err) { 
      //console.log("Error: ", err);
      setError(err.response.data.message)
    }
  }


  return (
    <section className='signup'>
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form signup_form" onSubmit={registerUser}>
          {console.log(error)}
          {error && <p className="form_error-msg"> {error}</p>}
          <input 
            type='text' 
            placeholder='Full Name' 
            name='name' 
            value={userData.name} 
            onChange={handleInputChange} 
            autoFocus 
          />
          <input 
            type='text' 
            placeholder='Email' 
            name='email' 
            value={userData.email} 
            onChange={handleInputChange} 
          />
          <input 
            type='password' 
            placeholder='Password' 
            name='password' 
            value={userData.password} 
            onChange={handleInputChange} 
          />
          <input 
            type='password' 
            placeholder='Confirm Password' 
            name='confirmPassword' 
            value={userData.confirmPassword} 
            onChange={handleInputChange} 
          />
          <button type='submit' className='btn primary'>Sign Up</button>
        </form>
        <small>Already have an account? <Link to='/login'>Sign in</Link></small>
      </div>
    </section>
  )
}

export default Signup