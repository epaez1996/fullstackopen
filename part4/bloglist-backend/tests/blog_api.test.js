const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
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

const initialUsers = [
    {
        username: "eddsipe",
        name: "edd",
        password: "woah" 
    },
    {
        username: "eddsipe5",
        name: "eddster",
        password: "woahwow" 
    }

]

describe('when there is initially some notes saved', () => {
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
    
    // test('a blog with no title returns 400 bad request', async () => {
    //     const requestBlog = {  
    //         likes: 5,
    //         author: "lmao",
    //         url: 'cap.com'
    //     }
    
    //     const result = await api
    //         .post('/api/blogs')
    //         .send(requestBlog)
    //         .expect(400)
    //         .expect('Content-Type', /application\/json/)
    
    //     console.log('Result is', result)
    //         expect(result.body.error).toContain('ValidationError')
    // })
})

describe('when initial users are saved', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        let userObject = new User(initialUsers[0])
        await userObject.save()
    
        userObject = new User(initialUsers[1])
        await userObject.save()
    });

    test('username must be unique for users', async () => {
        const newUser =  {
            username: "eddsipe",
            password: "testing"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('username must be at least length 3', async () => {
        const newUser =  {
            username: "ed",
            password: "testing",
            name: 'lelelle'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('password required for users', async () => {
        const newUser = {
            username: 'eddsipe55',
            name: 'edd'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

    })

    test('password must be at least length 3', async () => {
        const newUser = {
            username: 'eddsipe555',
            name: 'edd',
            password: '12'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
  })