import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import Errors from './Pages/Errors';
import Details from './Pages/Details';
import SiteLayout from './components/SiteLayout';
import HomePage from './Pages/HomePage';
import Signup from './Pages/Signup';
import LoginPage from './Pages/LoginPage';
import LogoutPage from './Pages/LogoutPage';
import Profile from './Pages/Profile';
import AuthorsPage from './Pages/AuthorsPage';
import PostCreate from './Pages/PostCreate';
import Categories from './Pages/Categories';
import AuthorsPosts from './Pages/AuthorsPosts';
import Dashboard from './Pages/Dashboard';
import EditPost from './Pages/EditPost';


const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    errorElement: <Errors/>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "posts/:id", element: <Details /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <LoginPage /> },
      { path: "logout", element: <LogoutPage /> },
      { path: "Profile/:id", element: <Profile /> },
      { path: "Authors", element: <AuthorsPage /> },
      { path: "create", element: <PostCreate /> },
      { path: "posts/categories/:category", element: <Categories /> },
      { path: "posts/users/:id", element: <AuthorsPosts /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "posts/:id/edit", element: <EditPost /> },
    ]
  }



])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
