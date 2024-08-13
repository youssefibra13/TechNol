import React, { useState } from 'react'
import { DUMMY_DATA } from '../data'
import PostBlog from '../components/PostBlog'

const AuthorsPosts = () => {
  const [posts, setPosts] = useState(DUMMY_DATA)

  return (
    <section className='posts'>
      {posts.length > 0 ? <div className="container posts_container">
        {
          posts.map(({ id, image, category, title, description, AuthorID }) => <PostBlog key={id} PostID={id} image={image} category={category} title={title} description={description} AuthorID={AuthorID} />)
        }
      </div> : <h2 className='center'> No Posts Found</h2>}
    </section>
  )
}

export default AuthorsPosts