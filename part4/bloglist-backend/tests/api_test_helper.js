const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: '601791aceeb9191b4ce54164',
        likes: 20,
        title: "Api Testing",
        author: "Tester test",
        url: "test.com",
        __v: 0
    },
    {
        _id: '601791aceeb9191b4ce54165',
        likes: 50,
        title: "Api Testing Second Time",
        author: "Tester test",
        url: "test2.com",
        __v: 0
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}