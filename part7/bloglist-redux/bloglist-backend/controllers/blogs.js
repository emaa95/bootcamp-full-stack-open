const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', middleware.userExtractor ,async (request, response) => {
  const body = request.body;

  const user = request.user;

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

blogsRouter.delete('/:id', middleware.userExtractor,async (request, response) => {

  const user = request.user;

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

blogsRouter.post('/:id/comments', async (req, res) => {
  const blogId = req.params.id;
  const comment = req.body.comment;

  if (!comment) {
    return res.status(400).json({ error: 'Comment content missing' });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    blog.comments = blog.comments.concat(comment);
    const updatedBlog = await blog.save();
    res.status(201).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = blogsRouter;

