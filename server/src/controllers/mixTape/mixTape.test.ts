// import express from "express";
// import supertest from "supertest";
// import mongoose from "mongoose";
// import router from "../../router";
// import MixTapeModel from "../../models/mixTape";

// import {
//   describe,
//   afterEach,
//   it,
//   afterAll,
//   expect,
//   beforeAll,
// } from "@jest/globals";

// const mockUser = {
//   _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
//   userName: "mock",
//   email: "test@example.com",
//   password: "123",
//   profilePic: "",
// };

// const mockChannel = {
//   _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
//   name: "NewMockChannel",
//   picture: "",
//   owner: mockUser,
//   members: [],
//   mixTapes: [],
// };

// const mixTapeMock = {
//   name: "Sample MixTape",
//   url: "https://example.com/sample-mixtape.mp3",
//   duration: 180, // Duration in seconds
//   channel: mockChannel._id, // Replace with actual channel ID
//   creator: mockUser._id, // Replace with actual user ID
// };

// describe("Mixtape Controller", () => {
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
//     await MixTapeModel.deleteMany();
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   it("should create a mixtape", async () => {
//     await request.post("/mixtape").send(mixTapeMock);

//     return await MixTapeModel.findOne({ name: mixTapeMock.name }).then(
//       (mixTape) => {
//         expect(mixTape?.name).toBe(mixTapeMock.name);
//         expect(mixTape?.url).toBe(mixTapeMock.url);
//         expect(mixTape?.duration).toBe(mixTapeMock.duration);
//         expect(mixTape?.channel.toString()).toBe(
//           mixTapeMock.channel.toString()
//         );
//         expect(mixTape?.creator._id.toString()).toBe(
//           mixTapeMock.creator.toString()
//         );
//       }
//     );
//   });
// });
