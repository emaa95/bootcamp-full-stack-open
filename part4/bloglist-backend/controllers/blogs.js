const blogsRouter = require('express').Router();
const { response } = require('../app');
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

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
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
  if (!deletedBlog) {
    return response.status(404);
  }
  response.status(204).end();
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

