import express from 'express';
import { check } from 'express-validator';

import auth from 'middleware/auth/auth';
import userController from 'controllers/user/user';

const router = express.Router();

const middlewaresRegister = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

const middlewaresAddUserInProject = [
  auth,
  check('user', 'User email is required').isEmail(),
  check('projectId', 'Project ID is required').not().isEmpty(),
];

// @route  POST api/user
// @desc   Register user
// @access Public
router.post('/', middlewaresRegister, userController.register);

// @route  GET api/user
// @desc   Add user in project
// @access Private
router.patch('/', middlewaresAddUserInProject, userController.addUserInProject);

export default router;
