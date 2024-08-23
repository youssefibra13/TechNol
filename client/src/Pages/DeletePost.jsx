import React, { useContext, useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';


const DeletePost = ({ PostId: id }) => {

  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  const { user } = useContext(UserContext)
  const token = user?.token;
  console.log(token)

  // redirect to login page for unauthenticated users
  useEffect(() => { 
    if (!token) {
      navigate('/login')
    }
  }, [])

  const removePost = async () => {
    setLoading(true)
    try {

      const response = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/posts/${id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      if (response.status === 200) {
        if (location.pathname === `/myposts/${user.id}`) {
          navigate(0)
        } else {
        navigate('/')
        }
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Link className="btn sm danger" onClick={() => removePost(id)}>Delete</Link>
  )
}

export default DeletePost