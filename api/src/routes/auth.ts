import express from 'express';
import { check } from 'express-validator';

import auth from 'middleware/auth/auth';

import authController from 'controllers/auth/auth';

const router = express.Router();

const middlewares = [check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists()];

// @route  GET api/auth
// @desc   Load user
// @access Public
router.get('/', auth, authController.load);

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public
router.post('/', middlewares, authController.authenticate);

export default router;
