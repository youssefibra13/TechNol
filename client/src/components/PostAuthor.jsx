import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../images/avatar.png';

const PostAuthor = () => {
  return (
    <Link to={`/posts/users/sdfsdf`} className='post_author'>
        <div className="post-author-img"> {/*post__author-avatar*/}
            <img src={Avatar} alt="author_image" /> 
        </div>
          <div className="post_author_details"> {/*post__author - details*/}
            <h5>By: Acheiver</h5>
            <small>Posted on: 2021-09-01</small>
            
            
        </div>
    </Link>
  )
}

export default PostAuthor