const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }

  if (!body.likes) {
    body.likes = 0;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {

  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);

  const deletedBlog = await Blog.findById(request.params.id);
  if (deletedBlog.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  } else {
    return response.status(404).json({ error: 'Unauthorized' });
  }
});

blogsRouter.put('/:id', async (request,response) => {
  const body = request.body;

  const blog = {
    likes: body.likes
  };

  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true } );

  if (!updateBlog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  response.status(200).json(updateBlog);
});

module.exports = blogsRouter;

