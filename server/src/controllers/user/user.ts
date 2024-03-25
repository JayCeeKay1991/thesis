import { Request, Response } from 'express';
import UserModel from '../../models/user';
import bcrypt from 'bcrypt';

// get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json('Error getting users');
    console.error(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        error: '400',
        message: 'Please provide email and password',
      });
    }

    // Check if the user already exists
    const userInDb = await UserModel.findOne({ email: email });
    if (userInDb)
      return res
        .status(409)
        .json({ error: '409', message: 'User already exists' });

    // Check if password is empty
    if (!password) {
      return res
        .status(400)
        .json({ error: '400', message: 'Password is required' });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new UserModel({
      ...req.body,
      password: hash,
    });

    // Save the new user to the database
    const user = await newUser.save();

    // SESSION !!!!
    if (req.session) {
      req.session.uid = user._id;
    }

    // send the result
    res.status(201).json(user);
  } catch (error) {
    // Handle any errors
    console.error('Error creating user:', error);
    res.status(500).json('Error creating user');
  }
};

// getting the logged in user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        error: '400',
        message: 'Please provide email and password',
      });
    }
    // Find user by email
    const user = await UserModel.findOne({ email: email })
      .populate({
        path: 'channels',
        populate: {
          path: 'mixTapes',
          model: 'MixTape',
        },
      })
      .exec();

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        error: '404',
        message: 'User not found.',
      });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password!);

    // If password is invalid, return unauthorized status
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: '401', message: 'Username or password is incorrect' });
    }

    // if everything correct, send the user
    // SESSION !!!!
    if (req.session) {
      req.session.uid = user._id;
    }

    res.status(200).json(user);
  } catch (error) {
    // console.error('Error logging in user:', error);
    res.status(500).json('Error logging in user');
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { userName, email, password, profilePic, channels, mixTapes } =
      req.body;
    if (!email || !userName) {
      return res.status(400).json({
        error: '400',
        message: 'Please provide email and username',
      });
    }
    if (!password) {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            userName: userName,
            email: email,
            profilePic: profilePic,
            channels: channels,
            mixTapes: mixTapes,
          },
        },
        { new: true }
      );
      res.status(201).send(updatedUser);
    } else {
      const hash = await bcrypt.hash(password, 10);
      const hashedPassword = hash;
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            userName: userName,
            email: email,
            password: hashedPassword,
            profilePic: profilePic,
            channels: channels,
            mixTapes: mixTapes,
          },
        },
        { new: true }
      );
      res.status(201).send(updatedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({
      message:
        'An unexpected error occurred while editing the user. Please try again later.',
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findOne({ _id: userId }).populate([
      'mixTapes',
      'channels',
    ]);
    if (!user) {
      res.status(401).json({ message: 'No user found.' });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({
      message:
        'An unexpected error occurred while getting the user. Please try again later.',
    });
  }
};

// SESSION
export const logout = (req: Request, res: Response) => {
  req.session &&
    req.session.destroy((error) => {
      if (error) {
        res
          .status(500)
          .send({ error, message: 'Could not log out, please try again' });
      } else {
        res.clearCookie('sid');

        res.status(200).send({ message: 'Logout successful' });
      }
    });
};

export default { createUser, login, editUser, logout };
