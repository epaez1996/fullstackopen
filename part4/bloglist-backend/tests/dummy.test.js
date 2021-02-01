const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

describe('total likes', () => {

    const emptyBlogList = []

    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
    
    const biggerList = [
        {
            _id: '5a422aa71b54a676234d47f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        }
    ]

      test('of empty list is zero', () => {
          const result = listHelper.totalLikes(emptyBlogList);
          expect(result).toBe(0)
      })

      test('when list only has one blog equals the likes of that', () => {
          const result = listHelper.totalLikes(listWithOneBlog)
          expect(result).toBe(5)
      })

      test('of a bigger list is calculated right', () => {
          const result = listHelper.totalLikes(biggerList)
          expect(result).toBe(15)
      })
})

describe('most favorite blog', () => {
    const emptyBlogList = []

    const biggerList = [
        {
            _id: '5a422aa71b54a676234d47f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.favoriteBlog(emptyBlogList);
        expect(result).toEqual({})
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.favoriteBlog(biggerList)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 10,
        })
    })
    
})
describe('a list containing 4 blogs', () => {
    const biggerList = [
        {
            _id: '5a422aa71b54a676234d47f8',
            title: 'Go To Statement Considered Harmful',
            author: 'tester',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 13,
            __v: 0
        },
        {
            _id: '6a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 0,
            __v: 0
        },
        {
            _id: '1a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'woah',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2,
            __v: 0
        }
    ]

    test('returns author who has the largest amount of blogs', async () => {
        // const list = listHelper.mostBlogs(biggerList)
        // console.log('list is', list)

        const list = listHelper.mostLikes(biggerList)
        console.log('list is', list)
    })
})