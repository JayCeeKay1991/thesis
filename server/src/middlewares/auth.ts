import { NextFunction, Request, Response } from 'express';

import UserModel, { UserType } from '../models/user';

// Define custom session interface
interface CustomSession extends Express.Session {
  uid?: string;
  // Add other session properties as needed
}

// Extend the Request interface with the custom session type
export interface CustomRequest extends Request {
  session: CustomSession;
  user?: UserType;
}

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // REMOVE-START
  try {
    const { uid } = req.session;
    const user = await UserModel.findOne({ _id: uid });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

export default authMiddleware;
