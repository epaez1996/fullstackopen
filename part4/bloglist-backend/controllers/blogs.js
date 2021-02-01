const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1, id: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    console.log('blog body is', body)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
        try {
            if (!request.token || !decodedToken.id) {
                return response.status(401).json({
                    error: 'invalid token'
                })
            }
        
            const user = await User.findById(decodedToken.id)
        
            const blog = new Blog({
                title: body.title,
                author: body.author,
                likes: body.likes,
                url: body.url,
                user: user._id
            })
            const savedBlog = await blog.save()
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
        
            response.json(savedBlog.toJSON())
        }
        catch(err) {
            console.log(err)
        }
    
})

blogsRouter.delete('/:id', async (request, response, next) => {
    //console.log('id is', request.params.id)
    const token = request.token;
    const decodedToken = await jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken) {
        return response.status(401).json({
            error: 'invalid token'
        })
    }

    const user = await User.findById(decodedToken.id)

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
    } else {
        return response.status(401).json({
            error: 'invalid user'
        })
    }
    
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body;
    const blogToUpdate = {
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter