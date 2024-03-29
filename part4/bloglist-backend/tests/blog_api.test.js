const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {

  await User.deleteMany({});

  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
}, 10000);

describe('when there is initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('blogs have unique identifier property "id"', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined();
      expect(blog._id).not.toBeDefined();
    });
  });

  describe('addition of a new blog', () => {
    let headers;

    beforeEach(async () => {
      const newUser = {
        username: 'root',
        name: 'root',
        password: 'password',
      };

      await api
        .post('/api/users')
        .send(newUser);

      const result = await api
        .post('/api/login')
        .send(newUser);

      headers = {
        'Authorization': `bearer ${result.body.token}`
      };
    });

    test('succceeds with a valid data', async () => {
      const newBlog = {
        title: 'Nuevo blog post',
        author: 'Autor del nuevo post',
        url: 'https://example.com/nuevo-post',
        likes: 0,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map(b => b.title);
      expect(titles).toContain('Nuevo blog post');
    });

    test('missing likes property defaults to 0', async () => {
      const newBlog = {
        title: 'Nuevo blog sin likes',
        author: 'Autor del nuevo post sin likes',
        url: 'https://example.com/nuevo-post-sin-likes'
      };

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      expect(response.body.likes).toBe(0);
    });

    test('missing title or url properties result in 400 Bad Request', async () => {
      // 1. Arrange (preparar los datos)
      const newBlog = {
        author: 'Autor del blog',
        likes: 2
      };

      // 2. Act (actuar sobre el sistema)
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(400);

      // 3. Assert (verificar los resultados)
      expect(response.body.error).toBe('Title and URL are required');

    });

  });

  describe('deletion of a blog', () => {
    let headers;

    beforeEach(async () => {
      const newUser = {
        username: 'root',
        name: 'root',
        password: 'password',
      };

      await api
        .post('/api/users')
        .send(newUser);

      const result = await api
        .post('/api/login')
        .send(newUser);

      headers = {
        'Authorization': `bearer ${result.body.token}`
      };
    });

    test('succeeds with status code 204 if id is valid', async () => {
      const newBlog = {
        title:'Masterpiece',
        author:'Edsger W. Dijkstra',
        url:'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes:12
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(201);

      const allBlogs = await helper.blogsInDb();
      const blogToDelete = allBlogs.find(blog => blog.title === newBlog.title);


      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set(headers)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      const contents = blogsAtEnd.map(b => b.title);

      expect(contents).not.toContain(blogToDelete.title);
    });
  });

  describe('updating of a blog', () => {
    let headers;

    beforeEach(async () => {
      const newUser = {
        username: 'root',
        name: 'root',
        password: 'password',
      };

      await api
        .post('/api/users')
        .send(newUser);

      const result = await api
        .post('/api/login')
        .send(newUser);

      headers = {
        'Authorization': `bearer ${result.body.token}`
      };
    });

    test('updating a blog\'s likes count', async () => {
      const newBlog = {
        title:'Masterpiece',
        author:'Edsger W. Dijkstra',
        url:'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes:12
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(201);

      const allBlogs = await helper.blogsInDb();
      const blogToUpdate = allBlogs.find(blog => blog.title === newBlog.title);

      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
      const foundBlog = blogsAtEnd.find(blog => blog.likes === 13);
      expect(foundBlog.likes).toBe(13);
    });
  });
});



afterAll(() => {
  mongoose.connection.close();
});

