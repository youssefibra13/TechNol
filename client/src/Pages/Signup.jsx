import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.Name]: e.target.value}

    })
  }

  return (
    <section className='signup'>
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form signup_form">
          <p className="form_error-msg">There might be an Error. Please Try Again</p>
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