import { Request, Response } from 'express';
// import CryptoAES from 'crypto-js/aes';
// import CryptoENC from 'crypto-js/enc-utf8';

import Project from 'models/Project/Project';
import User from 'models/User/User';

import checkErrors from 'utils/middlewareErrors';

// const { ENCRYPT_SECRET_KEY } = process.env;

const createProject = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { name, key, lead } = req.body;

    const projectBody = {
      name,
      key,
      lead,
    };
    const project = new Project(projectBody);

    await project.save();

    res.json({ msg: 'Successfully created project', severity: 'success' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

const getAllProjects = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { userEmail } = req.query;

    const user = await User.findOne({ email: String(userEmail) });

    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User not found', severity: 'error' }] });
    }

    const projects = await Project.find({ $or: [{ participants: { $elemMatch: { email: userEmail } } }, { lead: String(userEmail) }] });

    if (projects.length) {
      res.json(projects);
    } else {
      res.json(null);
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

const getOneProject = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { id, userEmail } = req.query;

    const user = await User.findOne({ email: String(userEmail) });

    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User not found', severity: 'error' }] });
    }

    // const decryptId = decodeURIComponent(CryptoAES.decrypt(String(id), ENCRYPT_SECRET_KEY as string).toString(CryptoENC));

    const project = await Project.findOne({
      $and: [{ $or: [{ participants: { $elemMatch: { email: userEmail } } }, { lead: String(userEmail) }] }, { _id: id }],
    });

    if (!project) {
      return res.status(404).json({ errors: [{ msg: 'Project not found', severity: 'error' }] });
    }

    res.json(project);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404).json({ errors: [{ msg: 'One of the IDs is incorrect', severity: 'error' }] });
      return;
    }

    res.status(500).send('Server Error');
  }
};

const deleteUserFromProject = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { projectId, userId, currentUserEmail } = req.body;

    const project = await Project.findOne({ _id: projectId, lead: currentUserEmail });

    if (!project) {
      return res.status(404).json({ errors: [{ msg: 'Project not found', severity: 'error' }] });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User is not found', severity: 'error' }] });
    }

    // @ts-ignore
    const findedUser = project.participants.find((partItem) => partItem._id === userId);

    if (!findedUser) {
      return res.status(404).json({ errors: [{ msg: 'This user is no longer in the project', severity: 'error' }] });
    }

    await Project.updateOne(
      { _id: projectId },
      {
        $pull: {
          participants: { _id: userId },
        },
      }
    );

    // @ts-ignore
    const newParticipants = project.participants.filter((partFilter) => partFilter._id !== userId);

    const data = {
      participants: newParticipants,
      message: { msg: 'User deleted successfully', severity: 'success' },
    };

    res.json(data);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404).json({ errors: [{ msg: 'One of the IDs is incorrect', severity: 'error' }] });
      return;
    }

    res.status(500).send('Server Error');
  }
};

export default { createProject, getAllProjects, getOneProject, deleteUserFromProject };
