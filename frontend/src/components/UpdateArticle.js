import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../App' // Ensure path is correct

function UpdateArticle({ match }) {
  const [formData, setFormData] = useState({ title: '', content: '' })
  const { user } = useContext(AuthContext) // Get user data from context

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/articles/${match.params.id}`,
        )
        setFormData({ title: res.data.title, content: res.data.content })
      } catch (err) {
        console.error(err)
      }
    }
    fetchArticle()
  }, [match.params.id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(
        `http://localhost:5000/articles/${match.params.id}`,
        formData,
        { headers: { 'x-auth-token': user.token } }, // Sending token in request header
      )
      alert('Article updated successfully')
    } catch (err) {
      alert('Article update failed')
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/articles/${match.params.id}`,
        { headers: { 'x-auth-token': user.token } }, // Sending token in request header
      )
      alert('Article deleted successfully')
      // Redirect or update UI accordingly
    } catch (err) {
      alert('Article deletion failed')
    }
  }

  return (
    <div>
      <p className="explore-description2">Tell your Tale</p>
      <form onSubmit={handleUpdate}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label>Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
        <button type="submit">Update Article</button>
        <button onClick={handleDelete}>Delete Article</button>
      </form>
    </div>
  )
}

export default UpdateArticle
