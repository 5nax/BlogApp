import React, { useState, useContext } from 'react'
import axios from 'axios'
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactQuill from 'react-quill'
import { AuthContext } from '../App'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-quill/dist/quill.snow.css'
import '../style/AddArticle.css'

function AddArticle() {
  const { user } = useContext(AuthContext)
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleContentChange = (content, delta, source, editor) => {
    setFormData({ ...formData, content: editor.getHTML() })
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('content', formData.content)
      data.append('userId', user.id)
      data.append('articleImage', image)

      await axios.post('http://localhost:5000/articles', data)
      alert('Article added successfully')
    } catch (err) {
      alert('Article addition failed')
      console.error(err)
    }
  }

  return (
    <div>
      <p className="explore-description1">Tell your Tale</p>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label>Content:</label>
        <ReactQuill value={formData.content} onChange={handleContentChange} />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Add Article</button>
      </form>
    </div>
  )
}

export default AddArticle
