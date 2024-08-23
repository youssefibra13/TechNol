import React, { useState, useEffect } from 'react'
import PostBlog from '../components/PostBlog'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Categories = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const {category} = useParams()

  useEffect(() => { 
    const fetchPosts = async () => {
        setLoading(true);
          try {
              const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/posts/categories/${category}`)
              setPosts(response?.data)

          } catch (error) {
              console.log(error)
          }
            
          setLoading(false)
    }

    fetchPosts();
  }, [category])

  if (loading) { 
    return <Loader />
  }    
  return (
      <section className='posts'>
          {posts.length > 0 ? <div className="container posts_container">
              {
                  posts.map(({ _id: id, image, category, title, description, creator, createdAt }) => <PostBlog key={id} PostID={id} image={image} category={category} title={title} description={description} AuthorID={creator} createdAt={createdAt} />)
              }
          </div> : <h2 className= 'center'> No Posts Found</h2>}
          
          
    </section>
  )
}

export default Categories