import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { FaBars } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";



const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(window.innerWidth > 800 ? true : false);
  const closeNavHandler = () => {
    if(window.innerWidth < 800){
      setIsNavOpen(false)
    } else {
      setIsNavOpen(true)
    }

  }
  return (

    <nav>
      <div className="container nav_container">
        <Link to="/" className="nav_logo" onClick={closeNavHandler}>
          <img src={Logo} alt="Navbar Logo" />
        </Link>
        {isNavOpen && <ul className="nav_links">
          <li><Link to="/profile" onClick={closeNavHandler}>  Profile</Link></li>
          <li><Link to="/Authors" onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
          <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
        </ul>}
        <button className="nav_toggle-btn" onClick={() => setIsNavOpen(!isNavOpen)}>
          {isNavOpen ? <AiOutlineCloseCircle /> : <FaBars />}


        </button>

      </div>
    </nav>
    
  )
}

export default Header