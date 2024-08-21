import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.Name]: e.target.value}

    })
  }

  return (
    <section className='login'>
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login_form">
          <p className="form_error-msg">There might be an Error. Please Try Again</p>
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