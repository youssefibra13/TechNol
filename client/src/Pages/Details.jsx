import React, {useEffect, useContext, useState} from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import blogpic from '../images/techwar.jpg'
import { UserContext } from '../context/userContext'
import Loader from '../components/Loader'
import DeletePost from './DeletePost'
import axios from 'axios'

const Details = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { user } = useContext(UserContext)

  useEffect(() => {
    const postGet = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/posts/${id}`)
        setPost(response.data)
      } catch (error) {
        setError(error)
      }
      setLoading(false)

    }

    postGet();
  },[])

  if (loading) {
    return <Loader />
  }

  return (
    <section className="post-details">
      {post && <div className="container post-detail-container">
        <div className="post-detail-header">
          <PostAuthor AuthorID={post.creator}  createdAt={post.createdAt}/>
          {user?.id === post?.creator && <div className="post-detail-buttons">
            <Link to={`/posts/${[post._id]}/edit`} className="btn sm primary">Edit</Link>
            <DeletePost PostId={id} />
            </div>}
        </div>
        <h1>{ post.title}</h1>
        <div className="post-detail-image">
          <img src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${post.image}`} alt="placeholder" />
        </div>
        <p dangerouslySetInnerHTML={{ __html: post.description }} />
      </div>}
    </section>
  )
}

export default Details