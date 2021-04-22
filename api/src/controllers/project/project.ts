import { Request, Response } from 'express';

import { Project } from '../../models/Project/Project';

import checkErrors from '../../utils/middlewareErrors';

const createProject = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { name, key } = req.body;

    const projectBody = {
      name,
      key,
    };
    const project = new Project(projectBody);

    await project.save();

    res.json({ msg: 'Successfully created project', severity: 'success' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

const updateProject = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { id, name, key } = req.body;

    const projectBody = {
      name,
      key,
    };

    await Project.updateOne({ _id: id }, { $set: projectBody });

    res.json({ msg: 'Successfully updated project', severity: 'success' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

const getAllProjects = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const projects = await Project.find();

    if (projects.length) {
      const convProjects = projects.map(({ _id, name, key, createdAt }) => ({ _id, name, key, createdAt }));

      res.json(convProjects);
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
    const { id } = req.params;

    const project = await Project.findById(id);

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

export default { createProject, updateProject, getAllProjects, getOneProject };
