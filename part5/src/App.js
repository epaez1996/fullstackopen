import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userLoggedJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (userLoggedJSON) {
      const userLogged = JSON.parse(userLoggedJSON)
      setUser(userLogged)
      blogService.setToken(userLogged.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
    } catch(exception) {
        console.log('Wrong Credentials')
    }
  }
  const LoginForm = (props) => (
    <div>
      <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            username 
            <input 
              type="text" 
              value={username}
              name="Username"
              onChange={ ({ target }) => setUserName(target.value)}
            />
          </div>
          <div>
            password 
              <input 
                type="password"
                value={password}
                name="Password"
                onChange={ ({ target }) => setPassword(target.value) } 
              />
          </div>
          <button type="submit">login</button>
        </form>
    </div>
  );
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const showBlog = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ?
        <LoginForm /> : 
        showBlog()
      }
    </div>
  )
}

export default App