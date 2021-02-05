import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  
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
        setErrorMessage('wrong username or password')
        setTimeout(() => {
         setErrorMessage(null)
        }, 5000)
    }
  }
 
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  
  const createNewBlog = async (newBlog) => {
    const blogCreated = await blogService.create(newBlog)
    
    setBlogs(blogs.concat(blogCreated))
    setSuccessMessage(`a new blog ${blogCreated.title} by ${blogCreated.author} added`)
    
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    
  }      

  const handleUsernameInput = event => setUserName(event.target.value)
  const handlePasswordInput = event => setPassword(event.target.value)

  const blogList = blogs.map(blog => {
    return <Blog key={blog.id} blog={blog} />
  })

  return (
    <div>
      {user === null ?
        <LoginForm 
          username={username}
          password={password}
          clickLogin={handleLogin}
          handleUsernameInput={handleUsernameInput}
          handlePasswordInput={handlePasswordInput}
          errorMessage={errorMessage}
        /> :
        <div>
          <h2>blogs</h2>
          <Notification successMessage={successMessage}/>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p> 
          <h2>create new</h2>
          <BlogForm 
            createNewBlog={createNewBlog}
            userId={user.id}
          />
          {blogList}
        </div>
      }
    </div>
  )
}

export default App