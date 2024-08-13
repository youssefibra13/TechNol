import React, { useState } from 'react'
import PostBlog from './PostBlog'
import { DUMMY_DATA } from '../data'


const Posts = () => {
    const [posts, setPosts] = useState(DUMMY_DATA)
  return (
      <section className='posts'>
          {posts.lengt > 0 ? <div className="container posts_container">
              {
                  posts.map(({ id, image, category, title, description, AuthorID }) => <PostBlog key={id} PostID={id} image={image} category={category} title={title} description={description} AuthorID={AuthorID} />)
              }
          </div> : <h2 className= 'center'> No Posts Found</h2>}
          
          
    </section>
  )
}

export default Posts