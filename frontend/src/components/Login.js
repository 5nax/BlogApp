import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../App'
import '../style/Login.css'

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const { setIsAuthenticated, setUser } = useContext(AuthContext)
  const history = useHistory()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/login', formData)

      // Handle token and user data
      localStorage.setItem('token', response.data.token)
      setIsAuthenticated(true)
      setUser(response.data.user)

      alert('Logged in successfully')
      history.push('/')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div>
      <h2 className="explore-title">Deep-Dive into the World of Exploration</h2>

      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          style={{ backgroundColor: 'white', color: 'black' }}
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
