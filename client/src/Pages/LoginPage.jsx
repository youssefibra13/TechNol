import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';

const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}

    })
  }

  const loginUser = async (e) => { 
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/users/login`, userData);
      const user = response.data;
      if (!user) {
        setError("Invalid credentials. Please try again.")
      }
      setUser(user);
      navigate('/');
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className='login'>
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login_form" onSubmit={loginUser}>
          {error && <p className="form_error-msg"> {error}</p>}
          <input 
            type='text' 
            placeholder='Email' 
            name='email' 
            value={userData.email} 
            onChange={handleInputChange}
            autoFocus
          />
          <input 
            type='password' 
            placeholder='Password' 
            name='password' 
            value={userData.password} 
            onChange={handleInputChange} 
          />

          <button type='submit' className='btn primary'>Login</button>
        </form>
        <small>Don't have an account? <Link to='/Signup'>Sign up</Link></small>
      </div>
    </section>
  )
}

export default LoginPage