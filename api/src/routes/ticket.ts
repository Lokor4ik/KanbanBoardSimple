import express from 'express';
import { check } from 'express-validator';

import ticketController from 'controllers/ticket/ticket';

const router = express.Router();

const commonMiddlewares = [check('projectId', 'Project id is required').not().isEmpty()];

const middlewaresCreateNewTicket = [
  ...commonMiddlewares,
  check('title', 'Title is required').not().isEmpty(),
  check('columnId', 'Column id is required').not().isEmpty(),
  check('keyNumber', 'Key number id is required').not().isEmpty(),
  check('index', 'Index is required').not().isEmpty(),
];

// @route  POST api/ticket
// @desc   Create new ticket
// @access Public
router.post('/', middlewaresCreateNewTicket, ticketController.createTicket);

// @route  GET api/ticket/:id
// @desc   Get project tickets
// @access Public
router.get('/:projectId', ticketController.getTickets);

export default router;
