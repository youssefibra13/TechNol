import React, { useState, useContext, useEffect}  from 'react'
import { Link, useNavigate,  } from 'react-router-dom'
import { FaEdit, FaCheck } from 'react-icons/fa'
import { UserContext } from '../context/userContext'
import axios from 'axios'


const Profile = () => {
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [IsImageExist, setIsImageExist] = useState(false)
  const [error, setError] = useState('')

  const { user } = useContext(UserContext)
  const token = user?.token
  const navigate = useNavigate()

  useEffect(() => { 
    if (!token) {
      navigate('/login')
    }
  }, [])

  useEffect(() => { 
    const fetchUser = async () => { 
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/users/${user.id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      const { name, email, image } = response.data;
      setName(name)
      setEmail(email)
      setImage(image)
    }
    fetchUser()
  }, [])

  const changePicture = async () => { 
    setIsImageExist(false)
    try {
      const formData = new FormData()
      formData.set('image', image)
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/users/change-picture`, formData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      setImage(response?.data.image)
    } catch (error) {
      console.log(error)

    }
  }

  const updateDetails = async (e) => { 
    e.preventDefault();

    try {
      const userData = new FormData()
      userData.set('name', name)
      userData.set('email', email)
      userData.set('currentPassword', currentPassword)
      userData.set('newPassword', newPassword)
      userData.set('confirmNewPassword', confirmNewPassword)

      const response = await axios.patch(`${import.meta.env.VITE_APP_BASE_URL}/users/edit-user`, userData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      if (response.status === 200) {
        navigate('/logout')
      } else {
        setError(response.data.message)
      }

    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/${user.id}`} className='btn'>
          My Dashboard
        </Link>
        <div className="profile_details">
          <div className="profile_wrapper">
            <div className="profile_image">
              <img src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${image}`} alt="profile_image" />
            </div>
            {/* form to update the image */}
            <form className="profile_form">
              <input type="file" name="image" id="image" onChange={e => setImage(e.target.files[0])} accept='png, jpg, jpeg'/>
              <label htmlFor="image" onClick={()=> setIsImageExist(true)}> <FaEdit/></label>
            </form>
            {IsImageExist && <button className='profile_image-btn' onClick={changePicture}> <FaCheck/> </button>}
          </div>

          <h1>{ user.name }</h1>
          {/* Form of User Details*/}
          <form className="form user_profile_form" onSubmit={updateDetails}>
            {error && <p className='form_error-msg'>{error}</p>}
            <input type="text" placeholder="Fullname" value={name} onChange={e => setName(e.target.value)} /> 
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Current Password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
            <button type="submit" className="btn primary">Update</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Profile