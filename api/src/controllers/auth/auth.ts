import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from 'models/User/User';

import checkErrors from 'utils/middlewareErrors';

import { ReqUser } from './types';

const { JWT_SECRET } = process.env;

const load = async (req: Request, res: Response) => {
  try {
    const { user: usr } = req;

    const user = await User.findById((usr as ReqUser).id).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

const authenticate = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials', severity: 'error' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials', severity: 'error' }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET as string, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        throw err;
      }

      res.json({
        token,
        user,
      });
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export default { load, authenticate };
