const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./api_test_helper')
const bcrypt = require('bcrypt')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    });
    
    test('blogs returned in json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('all blogs are returned' , async () => {
       const response = await api.get('/api/blogs')
    
       expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('unique id of blogs is named id, not _id', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body;
    
        blogs.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    
    })
    
    describe('adding new blog posts', () => {
        let token;
        beforeAll(async () => {
            await User.deleteMany({})
            
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash('test', saltRounds)
            const validUser = new User({ username: 'tester', name:"testso", passwordHash})
            await validUser.save()

            const loginResponse = await api 
                            .post('/api/login')
                            .send({ username: 'tester', password: 'test'})
                            .expect(200)
            const loginBody = loginResponse.body 
            token = loginBody.token

            return token
        })
    
        test('a blog post was successfully added', async () => {
            
            const newBlog = {
                title: "testing backend Pog",
                author: "Edward Paez",
                url: "test3.com",
            }
        
            await api  
                .post('/api/blogs')
                .send(newBlog)
                .set({ Authorization: `Bearer ${token}`})
                .expect(200)
            
            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
        })

        test('a blog with no likes gives 0 likes back', async () => {
            const newBlog = {
                title: "testing backend Pog",
                author: "Edward Paez",
                url: "test3.com",
            }
        
            const blogResponse = await api  
                .post('/api/blogs')
                .send(newBlog)
                .set({ Authorization: `Bearer ${token}`})
                .expect(200)
            const blogResponseBody = blogResponse.body
            expect(blogResponseBody.likes).toBe(0)
        });
        
        test('a blog with no title or url returns 400 bad request', async () => {
            const newBlog = {
                likes: 500
            }
        
            await api  
                .post('/api/blogs')
                .send(newBlog)
                .set({ Authorization: `Bearer ${token}`})
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })

        test('a blog with no token provided returns 401 unauthorized', async () => {
            const newBlog = {
                title: "testing backend Pog",
                author: "Edward Paez",
                url: "test3.com",
            }

            await api  
                .post('/api/blogs')
                .send(newBlog)
                .set({ Authorization: `Bearer `})
                .expect(401)
        })
    })
})
describe('when initial users are saved', () => {
    test('username must be unique for users', async () => {
        const newUser =  {
            username: "eddsipe",
            password: "testing"
        }
        newUserSaved = new User(newUser)
        await newUserSaved.save()

        await api
            .post('/api/users')
            .send({username: "eddsipe", password: "pword"})
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