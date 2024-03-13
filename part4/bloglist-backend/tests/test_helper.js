const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Cómo empezar con la programación',
    author: 'John Doe',
    url: 'https://example.com/como-empezar-programacion',
    likes: 25,
  },
  {
    title: 'Introducción a la inteligencia artificial',
    author: 'Jane Smith',
    url: 'https://example.com/introduccion-ia',
    likes: 30,
  },
  {
    title: 'Consejos para mejorar en matemáticas',
    author: 'Alice Johnson',
    url: 'https://example.com/mejorar-matematicas',
    likes: 20,
  },
  {
    title: 'Desarrollo web moderno con React',
    author: 'Bob Brown',
    url: 'https://example.com/desarrollo-web-react',
    likes: 40,
  },
  {
    title: 'Aprender Python desde cero',
    author: 'Emily Davis',
    url: 'https://example.com/aprender-python',
    likes: 35,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs, blogsInDb
};