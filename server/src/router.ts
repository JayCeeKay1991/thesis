import express from 'express';
import {
  login,
  createUser,
  editUser,
  getAllUsers,
  getUserById,
  profile,
  logout,
} from './controllers/user/user';
import {
  createChannel,
  addUserToChannel,
  getChannel,
  addComment,
  deleteChannel,
  getChannelsByUser,
} from './controllers/channel/channel';

import authMiddleware from './middlewares/auth';
import { deleteNotifications } from './controllers/notification/notification';
import { createMixTape } from './controllers/mixTape/mixTape';
import {
  deleteImageFromCloudinary,
  deleteMixesFromCloudinary,
} from './controllers/cloudinary/cloudinary';

// create router
const router = express.Router();

// USERS
// get
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
// post
router.post('/users/login', login);
router.post('/users', createUser);
// put
router.put('/users/:id', editUser);

// CHANNELS
// get
router.get('/channels/:userId', getChannelsByUser);
router.get('/channels/:channelId', getChannel);
// post
router.post('/channels', createChannel);
router.post('/channels/:channelId/:userId', addUserToChannel);
router.post('/channels/:channelId/', addComment);
// delete
router.delete('/channels/:channelId/', deleteChannel);

// MIXTAPES
router.post('/mixtape', createMixTape);

// NOTIFICATIONS
router.put("/notifications/:userId", deleteNotifications);

// for session
router.get('/me', authMiddleware, profile);
router.post('/logout', authMiddleware, logout);

// cloudinary
router.post('/deleteImage', deleteImageFromCloudinary);
router.post('/deleteMixes', deleteMixesFromCloudinary);


export default router;
