const math = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((maxBlog, currentBlog) => (currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog));
};

const mostBlogs = (blogs) => {
  if (math.isEmpty(blogs)) {
    return {};
  }

  const authorCounts = math.countBy(blogs, 'author');
  const authorWithMostBlogs = math.maxBy(math.keys(authorCounts), author => authorCounts[author]);

  return {
    author: authorWithMostBlogs,
    blogs: authorCounts[authorWithMostBlogs]
  };

};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
