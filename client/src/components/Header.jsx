import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { FaBars } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";



const Header = () => {
  return (

    <nav>
      <div className="container nav_container">
        <Link to="/" className="nav_logo">
          <img src={Logo} alt="Navbar Logo" />
        </Link>
        <ul className="nav_links">
          <li><Link to="/profile"> Profile</Link></li>
          <li><Link to="/Authors">Authors</Link></li>
          <li><Link to="/create">Create Post</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
        <button className="nav_toggle-btn">
          <AiOutlineCloseCircle />


        </button>

      </div>
    </nav>
    
  )
}

export default Header