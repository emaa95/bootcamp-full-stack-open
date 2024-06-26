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

const mostLikes = (blogs) => {
  if (math.isEmpty(blogs)) {
    return {};
  }

  const likesByAuthor = math.groupBy(blogs, 'author');

  const authorLikes = math.mapValues(likesByAuthor, (blogs) => {
    return math.sumBy(blogs, 'likes');
  });

  const authorWithMostLikes = math.maxBy(math.keys(authorLikes), (author) => authorLikes[author]);

  return {
    author: authorWithMostLikes,
    likes: authorLikes[authorWithMostLikes]
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
