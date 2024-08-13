import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>

      <ul className="footer_categories">
        <li><Link to="/posts/categories/Unintended Consequences"> Unintended Consequences</Link> </li>
        <li><Link to="/posts/categories/Tech Ethics & Philosophy"> Tech Ethics & Philosophy</Link> </li>
        <li><Link to="/posts/categories/Race and Technology"> Race & Technology</Link> </li>
        <li><Link to="/posts/categories/AI and Society"> AI & Society</Link> </li>
        <li><Link to="/posts/categories/Tech in Conflict"> Tech in Conflict</Link> </li>
        <li><Link to = "/posts/categories/Design for Justice"> Design for Justice</Link> </li>
        <li><Link to="/posts/categories/Future of Tech"> Future of Tech</Link> </li>
        <li><Link to="/posts/categories/Health & Tech"> Health & Tech</Link> </li>
      </ul>
      <div className="footer_copyright">
        <small>© 2021 Socio-Tech Journal. All Rights Reserved </small>
      </div>
      

    </footer>
  )
}

export default Footer