import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { Decoded } from './types';

const { JWT_SECRET } = process.env;

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);

    req.user = (decoded as Decoded).user;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;
