import { NextFunction, Request, Response } from 'express';
import { Session } from 'express-session';

import UserModel, { UserType } from '../models/user';

// Define custom session interface
interface CustomSession extends Session {
  uid?: string;
}

// Extend the Request interface with the custom session type
export interface CustomRequest extends Request {
  session: CustomSession ;
  user?: UserType;
}

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.session?.uid;
    if (!uid) throw new Error();
    const user = await UserModel.findOne({ _id: uid });
    if (!user) throw new Error();
    req.user = user;
    next();
    return;
  } catch (error) {
    return res.sendStatus(401);
  }
};

export default authMiddleware;
