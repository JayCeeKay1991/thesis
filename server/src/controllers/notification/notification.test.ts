// import express from "express";
// import supertest from "supertest";
// import mongoose from "mongoose";
// import router from "../../router";
// import UserModel from "../../models/user";
// import {
//   describe,
//   afterEach,
//   it,
//   afterAll,
//   expect,
//   beforeAll,
// } from "@jest/globals";
// import { app as realApp, server } from "../../index";
// import ChannelModel from "../../models/channel";
// import NotificationModel from "../../models/notifications";
// import { createNotification } from "../mixTape/mixTape";

// const mockNotification = {
//   _id: "65fad7e20e7f9b63e42ced00",
//   message: "mock message",
//   ownerChannel: "65fad7e20e7f9b63e42ced14",
//   unNotifiedUsers: ["65fad7e20e7f9b63e42ced11", "65fad7e20e7f9b63e42ced12"],
//   date: new Date(),
// };
// const mockNotification2 = {
//   _id: "65fad7e20e7f9b63e42ced00",
//   message: "mock message",
//   ownerChannel: "65fad7e20e7f9b63e42ced14",
//   unNotifiedUsers: [],
//   date: new Date(),
// };

// const mockUserId = "65fad7e20e7f9b63e42ced11";

// const newMockChannel = new ChannelModel({
//   name: "NewMockChannel",
//   picture: "",
//   owner: testUser,
//   members: [],
//   mixTapes: [],
// });

// describe("notification Controller", () => {
//   const app = express();
//   app.use(express.json());
//   app.use(router);
//   const request = supertest(app);

//   beforeAll(async () => {
//     await mongoose.connection.close();
//     const url = `mongodb://127.0.0.1/test`;
//     await mongoose.connect(url);
//   });

//   afterEach(async () => {
//     await UserModel.deleteMany();
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//     server.close();
//   });
//   it("should update a notification", async () => {
//     const mockWithId = await request
//       .post("/notifications")
//       .send(mockNotification);
//     return await request
//       .put(`/notifications/${mockUserId}`)
//       .then((response) => {
//         expect(response?.status).toBe(201);
//       });
//   });

//   it("should not update user if the one of the required fields is missing", async () => {
//     const mockWithId = await request.post("/users").send(mockNotification2);
//     return await request.put(`/users/${mockUserId}`).then((response) => {
//       expect(response?.status).toBe(400);
//     });
//   });
// });
