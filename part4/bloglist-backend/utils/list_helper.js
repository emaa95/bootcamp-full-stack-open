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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
