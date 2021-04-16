import express from 'express';
import { check, query } from 'express-validator';

import projectController from 'controllers/project/project';
import auth from 'middleware/auth/auth';

const router = express.Router();

const middlewaresCreateProject = [
  auth,
  check('name', 'Name is required').not().isEmpty(),
  check('key', 'Key is required').not().isEmpty(),
  check('lead', 'Lead is required').not().isEmpty(),
];

const middlewaresGetAllProject = [auth, query('userEmail', 'User email is required and need valid').isEmail()];
const middlewaresGetOneProject = [
  auth,
  query('id', 'Id is required').not().isEmpty(),
  query('userEmail', 'User email is required and need valid').isEmail(),
];
const middlewaresDeleteUserFromProj = [
  auth,
  check('userId', 'User id is required').not().isEmpty(),
  check('projectId', 'Project id is required').not().isEmpty(),
  check('currentUserEmail', 'Current email is required').not().isEmpty(),
];

// @route  POST api/project
// @desc   Create new project
// @access Private
router.post('/', middlewaresCreateProject, projectController.createProject);

// @route  GET api/project
// @desc   Get all assigned projects
// @access Private
router.get('/', middlewaresGetAllProject, projectController.getAllProjects);

// @route  GET api/project/one/:id
// @desc   Get one project
// @access Private
router.get('/one', middlewaresGetOneProject, projectController.getOneProject);

// @route  PATCH api/project/one
// @desc   Delete user from project
// @access Private
router.patch('/one', middlewaresDeleteUserFromProj, projectController.deleteUserFromProject);

export default router;
