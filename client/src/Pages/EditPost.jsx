import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'




const EditPost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

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

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        <p className="form_error-msg">There might be an Error. Please Try Again</p>
        <form className="form create-post_form">
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