import express from 'express';
import {
  login,
  createUser,
  editUser,
  getAllUsers,
  getUserById,
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
import { createMixTape } from './controllers/mixTape/mixTape';

import { RequestHandler } from 'express';
import authMiddleware, { CustomRequest } from './middlewares/auth';

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

// user profile check it later if we need
// router.get('/me', authMiddleware, userController.profile);
// router.post('/logout', authMiddleware, logout);
router.post('/logout', authMiddleware as RequestHandler, logout);

export default router;
