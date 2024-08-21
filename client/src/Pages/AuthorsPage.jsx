import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Avatar1 from '../images/avatar.png'

const authorsData = [
  { id: 1, avatar: Avatar1, name: 'Author 1', posts: 3 },
  { id: 2, avatar: Avatar1, name: 'Author 2', posts: 5 },
  { id: 3, avatar: Avatar1, name: 'Author 3', posts: 0 },
  { id: 4, avatar: Avatar1, name: 'Author 4', posts: 2 },
  { id: 5, avatar: Avatar1, name: 'Author 5', posts: 1 }, 
]
const AuthorsPage = () => {
  const [authors, setAuthors] = useState(authorsData)
  return (
    <section className="authors">
      {authors.length > 0 ? <div className="container authors_container">
        {
          authors.map(({ id, avatar, name, posts }) => {
            return <Link key={id} to={`/posts/users/${id}`} className='author'>
              <div className="author_image">
                <img src={avatar} alt={`Image of ${name}`} />
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