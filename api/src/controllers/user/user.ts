import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from 'models/User/User';
import Project from 'models/Project/Project';

import checkErrors from 'utils/middlewareErrors';

const { JWT_SECRET } = process.env;

const register = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists', severity: 'warning' }] });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const userData = {
      _id: user.id,
      name: user.name,
      email: user.email,
      date: user.createdAt,
    };

    jwt.sign(payload, JWT_SECRET as string, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        throw err;
      }

      res.json({
        token,
        user: userData,
      });
    });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

const addUserInProject = async (req: Request, res: Response) => {
  checkErrors(req, res);
  /* try {
    decoded = jwt.verify(authorization, secret.secretToken);
} catch (e) {
    return res.status(401).send('unauthorized');
}
var userId = decoded.id; */
  // const token = req.headers['x-auth-token'];

  try {
    const { user: userEmail, projectId } = req.body;

    const user = await User.findOne({ email: String(userEmail) }, { _id: 1, name: 1, email: 1 });

    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User is not found', severity: 'error' }] });
    }

    const project = await Project.findOne({ _id: projectId /* ,lead: currentUserEmail  */ });

    if (!project) {
      return res.status(404).json({ errors: [{ msg: 'Project not found', severity: 'error' }] });
    }

    // @ts-ignore
    const findedUser = project.participants.find((partItem) => partItem.email === userEmail) || project.lead === userEmail;

    if (findedUser) {
      return res.status(400).json({ errors: [{ msg: 'User already exists on this', severity: 'warning' }] });
    }

    const userData = {
      user: { _id: user._id, name: user.name, email: user.email },
      message: { msg: 'User added successfully', severity: 'success' },
    };

    await Project.updateOne(
      { _id: projectId },
      {
        $push: {
          participants: userData.user,
        },
      }
    );

    res.json(userData);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404).json({ errors: [{ msg: 'One of the IDs is incorrect', severity: 'error' }] });
      return;
    }

    res.status(500).send('Server Error');
  }
};

export default { register, addUserInProject };
