import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PostBlog from './PostBlog'
import Loader from './Loader'



const Posts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => { 
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/posts`)
                setPosts(response?.data)

            } catch (error) {
                console.log(error)
            }
            
            setLoading(false)
        }

        fetchPosts();
    }, [])

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

export default Posts