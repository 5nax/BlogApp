import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  createContext,
} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'
import appIcon from './images/572.png'
import './style/App.css'
import Slideshow from './components/Slideshow'

// Lazy load components
const Articles = lazy(() => import('./components/Articles'))
const AddArticle = lazy(() => import('./components/AddArticle'))
const UpdateArticle = lazy(() => import('./components/UpdateArticle'))
const Register = lazy(() => import('./components/Register'))
const Login = lazy(() => import('./components/Login'))
const UserPage = lazy(() => import('./components/UserPage'))
const Article = lazy(() => import('./components/Article'))

export const AuthContext = createContext()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [articles, setArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [randomArticles, setRandomArticles] = useState([])
  const [originalArticles, setOriginalArticles] = useState([])
  const [hasSubmittedSearch, setHasSubmittedSearch] = useState(false) // Track if the user has submitted a search
  const history = useHistory()

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  const handleSearchSubmit = (event, term) => {
    event.preventDefault()
    setSearchTerm(term)
    setHasSubmittedSearch(true) // Set to true when the user submits a search
    history.push('/all-articles') // Navigate to /all-articles after search submission
  }
  const getRandomArticles = (data, num) => {
    let randomArticles = []
    let usedIndices = new Set()

    while (randomArticles.length < num && randomArticles.length < data.length) {
      let randomIndex = Math.floor(Math.random() * data.length)

      if (!usedIndices.has(randomIndex)) {
        randomArticles.push(data[randomIndex])
        usedIndices.add(randomIndex)
      }
    }
    return randomArticles
  }
  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const res = await fetch('http://localhost:5000/articles')
        const data = await res.json()
        setArticles(data)
        setOriginalArticles(data)

        const selectedArticles = getRandomArticles(data, 5)
        setRandomArticles(selectedArticles)
      } catch (err) {
        console.error(err)
      }
    }
    fetchAllArticles()
  }, [])

  useEffect(() => {
    if (searchTerm && hasSubmittedSearch) {
      const fetchSearchedArticles = async () => {
        try {
          const res = await fetch(
            `http://localhost:5000/articles?search=${searchTerm}`,
          )
          const data = await res.json()
          setArticles(data)
        } catch (err) {
          console.error(err)
        }
      }
      fetchSearchedArticles()
    } else {
      // If search term is empty or user hasn't submitted a search, revert to the original articles
      setArticles(originalArticles)
    }
  }, [searchTerm, hasSubmittedSearch, originalArticles])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      <Router>
        <div className="frame">
          <header className="app-header">
            <Link to="/">
              <img src={appIcon} alt="App Icon" className="app-icon" />
            </Link>
            <h1 className="app-title">Roaming Nomads</h1>

            <Navigation
              isAuthenticated={isAuthenticated}
              handleLogout={handleLogout}
            />
          </header>

          <Suspense fallback={<div>Loading...</div>}>
            <Route
              path="/"
              exact
              render={() => (
                <>
                  <h2 className="explore-title">
                    Explore the world’s knowledge, cultures, and ideas
                  </h2>
                  <p className="explore-description">
                    Dive into a world where every thought matters. Explore
                    articles that span across various domains, discover ideas
                    that challenge your thinking, and find insights that spark
                    your curiosity. Be a part of a community that values
                    knowledge, shares wisdom, and builds a network of diverse
                    yet unified minds.
                  </p>
                  <Slideshow />
                  <p className="blog-description">Explore the Blogs</p>
                  <Articles articles={randomArticles} searchTerm={searchTerm} />
                </>
              )}
            />
            <Route
              path="/all-articles"
              render={() => (
                <div>
                  <h2 className="explore-title">Explore the Blogs</h2>

                  {hasSubmittedSearch && (
                    <form onSubmit={(e) => handleSearchSubmit(e, searchTerm)}>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button type="submit">Search</button>
                    </form>
                  )}
                  <Articles articles={articles} />
                </div>
              )}
            />
            <Route path="/add-article" component={AddArticle} />
            <Route path="/update-article/:id" component={UpdateArticle} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/user" component={UserPage} />
            <Route path="/article/:id" component={Article} />
          </Suspense>
          <footer className="app-footer">
            <p>Copyright © Himal Panta | Coding Task for IBriz.ai</p>
          </footer>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

const Navigation = ({ isAuthenticated, handleLogout }) => (
  <nav className="navbar">
    <Link className="nav-item" to="/">
      Home
    </Link>
    <Link className="nav-item" to="/all-articles">
      All Articles
    </Link>
    {isAuthenticated ? (
      <>
        <Link className="nav-item" to="/add-article">
          Add Article
        </Link>
        <Link className="nav-item" to="/user">
          User
        </Link>
        <button className="nav-item" onClick={handleLogout}>
          Logout
        </button>
      </>
    ) : (
      <>
        <Link className="nav-item" to="/register">
          Register
        </Link>
        <Link className="nav-item" to="/login">
          Login
        </Link>
      </>
    )}
  </nav>
)

export default App
