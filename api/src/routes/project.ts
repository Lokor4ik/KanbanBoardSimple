import express from 'express';
import { check } from 'express-validator';

import projectController from '../controllers/project/project';

const router = express.Router();

const commonMiddlewares = [check('name', 'Name is required').not().isEmpty(), check('key', 'Key is required').not().isEmpty()];

const middlewaresCreateProject = [...commonMiddlewares];
const middlewaresUpdateProject = [...commonMiddlewares, check('id', 'Project id is required').not().isEmpty()];

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

export default router;
