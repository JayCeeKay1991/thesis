import express from "express";
import supertest from "supertest";
import mongoose from "mongoose";
import router from "../../router";
import ChannelModel from "../../models/channel";

import {
  describe,
  afterEach,
  it,
  afterAll,
  expect,
  beforeAll,
} from "@jest/globals";
import UserModel from "../../models/user";

const mockUser = {
  userName: "mock",
  email: "test@example.com",
  password: "123",
  profilePic: "",
};

const mockUser3 = {
  userName: "mock3",
  email: "test3@example.com",
  password: "123",
  profilePic: "",
};

describe("Channel Controller", () => {
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
    await ChannelModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Should retrieve on channel", async () => {});

  it("Should add a user to a channel", async () => {
    await request.post("/users").send(mockUser);
    const testUser = await UserModel.findOne({ email: mockUser.email });

    const newMockChannel = new ChannelModel({
      name: "NewMockChannel",
      picture: "",
      owner: testUser,
      members: [],
      mixTapes: [],
    });

    await request.post("/channels").send(newMockChannel);
    const testChannel = await ChannelModel.findOne({
      name: newMockChannel.name,
    });
    const testChannelId = testChannel?._id;
    const testUserId = testUser!._id;

    await request
      .post(`/channels/:${testChannelId}/:${testUserId}`)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.members.length).toEqual(1);
      });
  });
});
