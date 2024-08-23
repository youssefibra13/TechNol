import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import Loader from '../components/Loader'
import DeletePost from './DeletePost'

const Dashboard = () => {
  
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()


  const { user } = useContext(UserContext)
  const token = user?.token;
  //console.log(token)

  // redirect to login page for unauthenticated users
  useEffect(() => { 
    if (!token) {
      navigate('/login')
    }
  }, [])


  useEffect(() => {

    const fetchPosts = async () => { 
      setLoading(true);
      try { 
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/posts/users/${id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
        setPosts(response.data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }

    fetchPosts()

  }, [id])

  if (loading) {
    return <Loader />
  }

  return (
    <section className='dashboard'>
      {posts.length > 0 ? <div className="container dashboard_container">
        {
          posts.map(post => {
            return <article key={post.id} className='dashboard_post'>
              <div className="dashboard_post-info">
                <div className="dashboard_post-image">
                  <img src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${post.image}`} alt="post_image" />
                </div>
                <h5>{post.title}</h5>
              </div>
              <div className="dashboard_post-actions">
                <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                <DeletePost PostId={post._id} />
              </div>
            </article>

          })
        }
      </div> : <h2 className='center'> You have no posts yet.</h2>}
    </section>
    
  )
}

export default Dashboard