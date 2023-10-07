import React, { useContext, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../App'

import '../style/UserPage.css'

function UserPage() {
  const { user, setIsAuthenticated, setUser } = useContext(AuthContext)
  const [userArticles, setUserArticles] = useState([])
  const history = useHistory()

  const handleLogout = () => {
    localStorage.removeItem('token') // Remove the token from localStorage
    setIsAuthenticated(false)
    setUser(null)
    history.push('/login') // Redirect to the login page
  }

  useEffect(() => {
    // Fetch the user's articles from the backend when the component mounts
    async function fetchUserArticles() {
      try {
        const response = await axios.get(
          `http://localhost:5000/articles/user/${user.id}`,
        )
        setUserArticles(response.data)
        console.log(response.data) // Log the response data
      } catch (error) {
        console.error('Error fetching user articles:', error)
      }
    }
    fetchUserArticles()
  }, [user.id])

  return (
    <div className="user-page">
      <h2 className="welcome-message">
        Welcome,
        {user.username}
      </h2>
      <h3 className="articles-header">Your Articles:</h3>
      <ul className="articles-list1">
        {userArticles.map((article) => (
          <li key={article.id} className="article-item">
            {article.title}
            {' '}
            -
            {' '}
            <Link to={`/update-article/${article.id}`} className="update-link">
              Update
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
