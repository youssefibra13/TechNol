import React, { useState, useEffect, useContext} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { UserContext } from '../context/userContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'




const EditPost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')

  const CategoriesPost = ["Unintended Consequences", "Tech Ethics & Philosophy", "Race & Technology", "AI & Society", "Tech in Conflict", "Design for Justice", "Future of Tech", "Health & Tech"]

  const navigate = useNavigate()
  const { id } = useParams()

  const { user } = useContext(UserContext)
  const token = user?.token;
  console.log(token)

  // redirect to login page for unauthenticated users
  useEffect(() => { 
    if (!token) {
      navigate('/login')
    }
  }, [])

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


  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/posts/${id}`)
        setTitle(response.data.title)
        setDescription(response.data.description)
      } catch (error) {
        console.log(error)
      }
    }
    getPost()

  }, [])


  const editPost = async (e) => { 
    e.preventDefault();
    const formData = new FormData();
    formData.set('title', title);
    formData.set('category', category);
    formData.set('description', description);
    formData.set('image', image);

    try {
      const response = await axios.patch(`${import.meta.env.VITE_APP_BASE_URL}/posts/${id}`, formData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      if (response.status === 200) {
        return navigate('/')
      }
    } catch (error) {
      setError(error.response.data.message)
    } 
  }

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form_error-msg">{error}</p>}
        <form className="form create-post_form" onSubmit={editPost}>
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
          <button type="submit" className="btn primary">Update</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost