import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'


const AuthorsPage = () => {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => { 
    setLoading(true);
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/users`)
        setAuthors(response.data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }

    fetchAuthors();
  }, [])

  if (loading) {
    return <h2 className='center'>Loading...</h2>
  }
  return (
    <section className="authors">
      {authors.length > 0 ? <div className="container authors_container">
        {
          authors.map(({ _id: id, image, name, posts }) => {
            return <Link key={id} to={`/posts/users/${id}`} className='author'>
              <div className="author_image">
                <img src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${image}`} alt={`Image of ${name}`} />
              </div>
              <div className="author_info">
                <h4>{name}</h4>
                <p>{posts} Posts</p>
              </div>
            </Link>
          })
        }
      </div> : <h2 className='center'> No Authors Found</h2>}
    </section>
  )
}

export default AuthorsPage