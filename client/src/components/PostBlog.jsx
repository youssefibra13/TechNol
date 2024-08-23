import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'

const PostBlog = ({ PostID, category, description, title, AuthorID, image, createdAt }) => {
    const showdescription = description.length > 250 ? description.substring(0, 250) + '...' : description;
    const showtitle = title.length > 50 ? title.substring(0, 50) + '...' : title;
  return (
    <article className="post">
          <div className="post_image"> {/*post__thumbnail*/}
              <img src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${image}`} alt={title} />
        </div>
        <div className="post_content">
            <Link to= {`/posts/${PostID}`}>
                <h3>{showtitle}</h3>
            </Link>
            <p>{showdescription}</p>
            <div className="post_footer">
                  <PostAuthor AuthorID={ AuthorID } createdAt = {createdAt} />
                <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
            </div>
        </div>  
    </article>
  )
}

export default PostBlog