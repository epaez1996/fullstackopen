const collection = require('lodash/collection')
var groupBy = require('lodash.groupby');
var pull = require('lodash.pull');
var sortBy = require('lodash.sortby');
const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let total = blogs.reduce((sum, currentVal) => {
        return sum + currentVal.likes
    }, 0)

    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {};
    }

   let mostLikes = blogs.reduce((max, blog) => {
       return blog.likes >= max ? blog.likes : max 
   }, blogs[0].likes) 

   const mostFavBlog = blogs.filter( blog => blog.likes === mostLikes)
  
   return {
       title: mostFavBlog[0].title,
       author: mostFavBlog[0].author,
       likes: mostFavBlog[0].likes
   }
}

const mostBlogs = (blogs) => {
   const authorList = blogs.map(blog => blog.author)
   console.log('authorList is', authorList)
   const newList = authorList.map(author => {
       console.log('author is', author)
       return pull(authorList, author)
   })

   return newList
}

const mostLikes = (blogs) => {
    const sortedList = sortBy(blogs, ['author', 'likes'])
    return sortedList
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}