import React, { useState, useContext }  from 'react'
import { Link, useParams } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { FaBars } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { UserContext } from '../context/userContext';



const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(window.innerWidth > 800 ? true : false);
  const { user } = useContext(UserContext);

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
        {user?.id && isNavOpen && <ul className="nav_links">
          <li><Link to={`/profile/${user.id}`}  onClick={closeNavHandler}> {user?.name}</Link></li>
          <li><Link to="/Authors" onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
          <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
        </ul>}
        {!user?.id && isNavOpen && <ul className="nav_links">
          <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to="/login" onClick={closeNavHandler}>Login</Link></li>
        </ul>}
        <button className="nav_toggle-btn" onClick={() => setIsNavOpen(!isNavOpen)}>
          {isNavOpen ? <AiOutlineCloseCircle /> : <FaBars />}


        </button>

      </div>
    </nav>
    
  )
}

export default Header