const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1, id: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    
    const users = await User.find({})
    const randomUser = users[Math.floor(Math.random() * users.length)]

    const blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url,
        user: randomUser._id
    })
    const savedBlog = await blog.save()
    randomUser.blogs = randomUser.blogs.concat(savedBlog._id)
    await randomUser.save()

    response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {
    //console.log('id is', request.params.id)
    await Blog.findByIdAndDelete(request.params.id)
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