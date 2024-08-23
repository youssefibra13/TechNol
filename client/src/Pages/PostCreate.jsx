import React, { useState, useContext, useEffect} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'





const PostCreate = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { user } = useContext(UserContext)
  const token = user?.token;
  console.log(token)

  // redirect to login page for unauthenticated users
  useEffect(() => { 
    if (!token) {
      navigate('/login')
    }
  }, [])

  const CategoriesPost = ["Unintended Consequences", "Tech Ethics & Philosophy", "Race & Technology", "AI & Society", "Tech in Conflict", "Design for Justice", "Future of Tech", "Health & Tech"]

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]


  const postCreateNew = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('title', title);
    formData.set('category', category);
    formData.set('description', description);
    formData.set('image', image);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/posts`, formData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      if (response.status === 201) {
        return navigate('/')
      }
     
    } catch (error) {
      setError(error.response.data.message)
    }


  }

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form_error-msg">{error} </p>}
        <form className="form create-post_form" onSubmit={postCreateNew}>
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {
              CategoriesPost.map(category => <option key={category}>{category}</option>)
            }

          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
          <input 
            type="file" 
            name="image" 
            id="image" 
            onChange={e => setImage(e.target.files[0])} 
            accept="png, jpg, jpeg" 
          />
          <button type="submit" className="btn primary">Create</button>
        </form>
      </div>
    </section>
  )
}

export default PostCreate