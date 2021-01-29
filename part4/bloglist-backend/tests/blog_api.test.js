const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: "Testing backend api",
        author: "Edward Paez",
        url: "test.com"
    },
    {
        title: "Testing backend apiii",
        author: "Edward Paez",
        url: "test2.com"
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
});

test('blogs returned in json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned' , async () => {
   const response = await api.get('/api/blogs')

   expect(response.body).toHaveLength(initialBlogs.length)
   expect()
})

test('unique id of blogs is named id, not _id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body;

    blogs.forEach(blog => {
        expect(blog.id).toBeDefined()
    })

})

test('a blog post was successfully added', async () => {
    const newBlog = {
        title: "testing backend Pog",
        author: "Edward Paez",
        url: "test3.com"
    }

    await api  
        .post('/api/blogs', newBlog)
        .send(newBlog)
        .expect(200)

        const response = await api.get('/api/blogs')
    
    const titles = response.body.map(blog => blog.title)
    
    expect(response.body).toHaveLength(initialBlogs.length+1)
    expect(titles).toContain('testing backend Pog')
})

test('a blog with no likes gives 0 likes back', async () => {
   const requestBlog = {
       title: "lol",
       author: "lmao",
       url: "bruh.com"
   }

   await api
        .post('/api/blogs', requestBlog)
        .send(requestBlog)
        .expect(201)

   const response = await api.get('/api/blogs')
   const mostRecentBlogLikes = response.body.pop().likes

   expect(mostRecentBlogLikes).toBe(0)
})

test('a blog with no title returns 400 bad request', async () => {
    const requestBlog = {  
        likes: 5,
        author: "lmao",
        url: 'cap.com'
    }

    await api
        .post('/api/blogs', requestBlog)
        .send(requestBlog)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
  })