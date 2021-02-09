import React, { useState } from 'react'

const BlogForm = ({ createNewBlog, userId }) => {
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const handleTitleChange = (event) => setNewTitle(event.target.value)
	const handleAuthorChange = (event) => setNewAuthor(event.target.value)
	const handleUrlChange = (event) => setNewUrl(event.target.value)

	const addBlog = (event) => {
		event.preventDefault()
		const newBlog = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
			user: userId
		}
		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')

		createNewBlog(newBlog)
	}

	return (
		<div className="formDiv">
			<form onSubmit={ addBlog }>
				<div>
            title:
					<input
						id="title"
						type="text"
						name="blogTitle"
						value={newTitle}
						onChange={handleTitleChange}
					/>
				</div>
				<div>
            author:
					<input
						id="author"
						type="text"
						name="blogAuthor"
						value={newAuthor}
						onChange={handleAuthorChange}
					/>
				</div>
				<div>
            url:
					<input
						id="url"
						type="text"
						name="blogUrl"
						value={newUrl}
						onChange={handleUrlChange}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default BlogForm