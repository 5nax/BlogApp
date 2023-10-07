import React, { useState } from 'react'
import axios from 'axios'
import '../style/Register.css'

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/register', formData)
      alert('Registered successfully')
    } catch (err) {
      alert('Registration failed')
    }
  }

  return (
    <div>
      <h2 className="explore-title">Deep-Dive into the World of Exploration</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label className="register-label">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="register-input"
        />
        <label className="register-label">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="register-input"
        />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  )
}
export default Register
