import express from 'express';
import supertest from 'supertest';
import mongoose from 'mongoose';
import router from '../../router';
import UserModel from '../../models/user';
import {
  describe,
  afterEach,
  it,
  afterAll,
  expect,
  beforeAll,
} from '@jest/globals';
import { app as realApp, server } from '../../index';

const mockUser = {
  _id: '65fad7e20e7f9b63e42ced00',
  userName: 'mock',
  email: 'test@example.com',
  password: '123',
  profilePic: '',
};

const mockUser2 = {
  userName: 'mock',
  email: '',
  password: '123',
  profilePic: '',
};

const mockUser3 = {
  userName: 'mock3',
  email: 'test3@example.com',
  password: '123',
  profilePic: '',
};

const mockUser4 = {
  userName: 'mock4',
  email: 'test4@example.com',
  password: '123',
  profilePic: '',
};

describe('User Controller', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    await mongoose.connection.close();
    const url = `mongodb://127.0.0.1/test`;
    await mongoose.connect(url);
  });

  afterEach(async () => {
    await UserModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it('should create new User in the DB', async () => {
    await request.post('/users').send(mockUser);

    return await UserModel.findOne({ userName: mockUser.userName }).then(
      (user) => {
        expect(user?.userName).toBe(mockUser.userName);
        expect(user?.email).toBe(mockUser.email);
      }
    );
  });

  it('should not created User without an email', async () => {
    await request
      .post('/users')
      .send(mockUser2)
      .then((response) => {
        expect(response.status).toBe(400);
      });
  });

  it('should login user', async () => {
    await request.post('/users').send(mockUser);

    return await request
      .post('/users/login')
      .send({ email: mockUser.email, password: mockUser.password })
      .then((response) => {
        expect(response?.status).toBe(200);
      });
  });

  it('should not login with incorrect credentials', async () => {
    await request.post('/users').send(mockUser);

    return await request
      .post('/users/login')
      .send({ email: mockUser.email, password: 'wrongpw' })
      .then((response) => {
        expect(response?.status).toBe(401);
      });
  });

  it('should update a user', async () => {
    const mockWithId = await request.post('/users').send(mockUser);
    return await request
      .put(`/users/${mockWithId.body._id}`)
      .send(mockUser3)
      .then((response) => {
        expect(response?.status).toBe(201);
      });
  });

  it('should not update user if the one of the required fields is missing', async () => {
    const mockWithId = await request.post('/users').send(mockUser);
    return await request
      .put(`/users/${mockWithId.body._id}`)
      .send(mockUser2)
      .then((response) => {
        expect(response?.status).toBe(400);
      });
  });

  it('should retrieve all users', async () => {
    await request.post('/users').send(mockUser);
    await request.post('/users').send(mockUser4);

    return await request.get('/users').then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(2);
    });
  });

  it('should logout user', async () => {
    const api = supertest.agent(realApp);

    await api.post('/users').send(mockUser);

    const loginRes = await api
      .post('/users/login')
      .send({ email: mockUser.email, password: mockUser.password });
    expect(loginRes.status).toBe(200);

    const logoutRes = await api.post('/logout');
    expect(logoutRes.status).toBe(200);
  });
});
