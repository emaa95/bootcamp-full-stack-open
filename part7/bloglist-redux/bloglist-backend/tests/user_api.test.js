const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const helper = require('./test_helper.js');
const api = supertest(app);

describe('Creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const userObjects = helper.initialUsers
      .map(user => new User(user));
    const promiseArray = userObjects.map(user => user.save());
    await Promise.all(promiseArray);
  }, 10000);

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = { username: 'ema', name: 'superuser', password: '1234' };
    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/);
    expect(result.body.error).toContain('expected `username` to be unique');
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });


  test('should return error if username or password is missing', async () => {
    const newUser = { password: 'password' };
    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toContain('Both username and password are required');
  });

  test('should return error if username or password length is less than 3', async () => {
    const newUser = { username: 'us', password: 'pw' };
    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toContain('at least 3 characters');
  });

  test('should create a new user if all conditions are met', async () => {
    const newUser = { username: 'newuser', password: 'password' };
    const response = await api.post('/api/users').send(newUser).expect(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('newuser');
  });
});