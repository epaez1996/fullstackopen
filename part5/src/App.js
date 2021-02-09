import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggable from './components/Toggable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const [successMessage, setSuccessMessage] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs.sort((a, b) => a.likes - b.likes) )
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

	const submitLogin = async (username, password) => {

		try {
			const user = await loginService.login({
				username, password
			})
			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)

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
		blogFormRef.current.toggleVisibility()
		const blogCreated = await blogService.create(newBlog)

		setBlogs(blogs.concat(blogCreated).sort((a, b) => a.likes - b.likes))
		setSuccessMessage(`a new blog ${blogCreated.title} by ${blogCreated.author} added`)

		setTimeout(() => {
			setSuccessMessage(null)
		}, 5000)

	}


	const updateBlog = (updatedBlog) => {
		const blogToUpdate = blogs.find(blog => blog.id === updatedBlog.id)
		let posOfBlogToUpdate = blogs.indexOf(blogToUpdate)

		const tempArray = [...blogs]
		updatedBlog.user = blogToUpdate.user
		tempArray[posOfBlogToUpdate] = updatedBlog

		setBlogs(tempArray.sort((a, b) => a.likes - b.likes))
	}

	const blogList = blogs.map(blog => {
		return <Blog
			key={blog.id}
			blog={blog}
			updateBlog={updateBlog}
			deleteBlog={() => deleteBlog(blog)}/>
	})

	const deleteBlog = (blogToDelete) => {
		const answer = window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)
		if (answer) {
			blogService
				.remove(blogToDelete)
				.then(setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id)))
				.catch(err => {
					console.log(err)
				})
		}
	}

	const loginForm = () => (

		<LoginForm
			submitLogin={submitLogin}
			errorMessage={errorMessage}
		/>

	)

	const blogForm = () => (
		<Toggable buttonLabel="create new blog" ref={blogFormRef}>
			<BlogForm
				createNewBlog={createNewBlog}
				userId={user.id}
			/>
		</Toggable>
	)

	const blogFormRef = useRef()

	return (
		<div>
			{user === null ?
				loginForm() :
				<div>
					<h2>blogs</h2>
					<Notification successMessage={successMessage}/>
					<p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
					<h2>create new</h2>
					{blogForm()}
					{blogList}
				</div>
			}
		</div>
	)
}

export default App