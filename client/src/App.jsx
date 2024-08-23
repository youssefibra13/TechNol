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
import DeletePost from './Pages/DeletePost';
import UserContextProvider from './context/userContext';


const router = createBrowserRouter([
  {
    path: "/",
    element: <UserContextProvider><SiteLayout/></UserContextProvider>,
    errorElement: <Errors/>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "posts/:id", element: <Details /> },
      { path: "register", element: <Signup /> },
      { path: "login", element: <LoginPage /> },
      { path: "logout", element: <LogoutPage /> },
      { path: "profile/:id", element: <Profile /> },
      { path: "authors", element: <AuthorsPage /> },
      { path: "create", element: <PostCreate /> },
      { path: "posts/categories/:category", element: <Categories /> },
      { path: "posts/users/:id", element: <AuthorsPosts /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
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
