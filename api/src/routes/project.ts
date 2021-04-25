import express from 'express';
import { check } from 'express-validator';

import projectController from '../controllers/project/project';

const router = express.Router();

const commonMiddlewares1 = [check('name', 'Name is required').not().isEmpty(), check('key', 'Key is required').not().isEmpty()];
const commonMiddlewares2 = [check('id', 'Project id is required').not().isEmpty()];

const middlewaresCreateProject = [...commonMiddlewares1];
const middlewaresUpdateProject = [...commonMiddlewares1, ...commonMiddlewares2];
const middlewaresDeleteProject = [...commonMiddlewares2];

// @route  POST api/project
// @desc   Create new project
// @access Public
router.post('/', middlewaresCreateProject, projectController.createProject);

// @route  PATCH api/project
// @desc   Update project
// @access Public
router.patch('/', middlewaresUpdateProject, projectController.updateProject);

// @route  GET api/project
// @desc   Get all projects
// @access Public
router.get('/', projectController.getAllProjects);

// @route  GET api/project/:id
// @desc   Get one project
// @access Public
router.get('/:id', projectController.getOneProject);

// @route  DELETE api/project/
// @desc   Delete current project
// @access Public
router.delete('/', middlewaresDeleteProject, projectController.deleteCurrentProject);

export default router;
