const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    // const reducer = (sum, item) => {
    //     return sum + item
    // }

    // return blogs.reduce(reducer, 0);

    let total = blogs.reduce((sum, currentVal) => {
        return sum + currentVal.likes
    }, 0)

    return total
}

const favoriteBlog = (blogs) => {
   // console.log('blogs is', typeof(blogs[0]))
// Go over this after exercise submitted 
    if (blogs.length === 0) {
        return {};
    }

   let mostLikes = blogs.reduce((max, blog) => {
       return blog.likes >= max ? blog.likes : max 
   }, blogs[0].likes) 

   const mostFavBlog = blogs.filter( blog => blog.likes === mostLikes)
   //console.log('mostFavBlog', mostFavBlog)
   return {
       title: mostFavBlog[0].title,
       author: mostFavBlog[0].author,
       likes: mostFavBlog[0].likes
   }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}