import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import tokyo from '../images/avatar.png'
import { FaEdit, FaCheck } from 'react-icons/fa'

const Profile = () => {
  const [image, setImage] = useState(tokyo)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/sdfsdf`} className='btn'>
          My profile
        </Link>
        <div className="profile_details">
          <div className="profile_wrapper">
            <div className="profile_image">
              <img src={image} alt="profile_image" />
            </div>
            {/* form to update the image */}
            <form className="profile_form">
              <input type="file" name="image" id="image" onChange={e => setImage(e.target.files[0])} accept='png, jpg, jpeg'/>
              <label htmlFor="image"> <FaEdit/></label>
            </form>
            <button className="profile_image-btn"><FaCheck /></button>
          </div>

          <h1>Username</h1>
          {/* Form of User Details*/}
          <form className="form user_profile_form">
            <p className='form_error-msg'>Error. Please Try Again!</p>
            <input type="text" placeholder="Fullname" value={name} onChange={e => setName(e, target.value)} /> 
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Current Password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button type="submit" className="btn primary">Update</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Profile