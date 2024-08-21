import React from 'react'
import {Outlet} from "react-router-dom"
import Header from './Header'
import Footer from './Footer'
import AuthorsPosts from '../Pages/AuthorsPosts'

const SiteLayout = () => {
  return (
      <>
          <Header />
                <Outlet/>
          <Footer/>
      </>
  )
}

export default SiteLayout