import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const PostAuthor = ({ AuthorID, createdAt }) => {

  const [author, setAuthor] = useState({})

  useEffect(() => { 
    const getUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/users/${AuthorID}`)
        setAuthor(response?.data)
      } catch (error) {
        console.log(error)
      }
    }

    getUser();
  }, [])
  


  return (
    <Link to={`/posts/users/${AuthorID}`} className='post_author'>
        <div className="post-author-img"> {/*post__author-avatar*/}
        <img src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${author?.image}`}  alt="author_image" /> 
        </div>
          <div className="post_author_details"> {/*post__author - details*/}
        <h5>By: { author?.name}</h5>
        <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US' /></small>
            
            
        </div>
    </Link>
  )
}

export default PostAuthor