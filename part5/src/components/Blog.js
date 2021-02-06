import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog }) => { 
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLike = async () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    
    const blogAfterUpdate = await blogService.update(updatedBlog, blog.id)
    updateBlog(blogAfterUpdate)
  }

  if (blogDetailsVisible) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={() => setBlogDetailsVisible(false)}>hide</button> <br/>
        {blog.url} <br/>
        {blog.likes} <button onClick={increaseLike}>like</button><br/>
        {blog.user.name}<br/>
        <button onClick={deleteBlog}>remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
       <p> {blog.title} {blog.author} <button onClick={() => setBlogDetailsVisible(true)}>view</button></p>
      </div>
    </div>
  )

}

export default Blog
