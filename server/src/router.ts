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

const router = express.Router();

router.get('/users', getAllUsers);

router.get('/users/:userId', getUserById);

router.post('/users/login', login);
router.post('/users', createUser);
router.put('/users/:id', editUser);

router.get('/channels/:channelId', getChannel);
router.post('/channels', createChannel);
router.post('/channels/:channelId/:userId', addUserToChannel);
router.post('/channels/:channelId/', addComment);
router.delete('/channels/:channelId/', deleteChannel);

router.get('/dash/:userId', getChannelsByUser);

router.post('/mixtape', createMixTape);


// router.put("/notifications/:userId", updateNotification);
router.put("/notifications/:userId", deleteNotifications);

// router.put('/notifications/:userId', updateNotification);
// for session
router.get('/me', authMiddleware, profile);
router.post('/logout', authMiddleware, logout);
// cloudinary
router.post('/deleteImage', deleteImageFromCloudinary);
router.post('/deleteMixes', deleteMixesFromCloudinary);


export default router;
