import React from 'react'

const BlogForm = (props) => (
    <div>
        <form onSubmit={props.createNewBlog}>
          <div>
            title:
            <input 
              type="text"
              name="blogTitle"
              value={props.blogTitle}
              onChange={props.handleTitleChange}
            />
          </div>
          <div> 
            author:
            <input 
              type="text"
              name="blogAuthor"
              value={props.blogAuthor}
              onChange={props.handleAuthorChange}
            />
          </div>
          <div>
            url:
            <input 
              type="text"
              name="blogUrl"
              value={props.blogUrl}
              onChange={props.handleUrlChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
    </div>
)

export default BlogForm