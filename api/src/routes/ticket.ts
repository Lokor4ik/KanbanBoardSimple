import express from 'express';
import { check } from 'express-validator';

import ticketController from '../controllers/ticket/ticket';

const router = express.Router();

const commonMiddlewares = [check('projectId', 'Project id is required').not().isEmpty()];

const middlewaresCreateNewTicket = [
  ...commonMiddlewares,
  check('columnId', 'Column id is required').not().isEmpty(),
  check('title', 'Title is required').not().isEmpty(),
  check('keyNumber', 'Key number id is required').not().isEmpty(),
  check('index', 'Index is required').not().isEmpty(),
];

const middlewaresChangePositionTicket = [...commonMiddlewares, check('updatedTickets', 'Updated tickets is required').not().isEmpty()];

// @route  POST api/ticket
// @desc   Create new ticket
// @access Public
router.post('/', middlewaresCreateNewTicket, ticketController.createTicket);

// @TO-DO: need to improve name of id !!!
// @route  GET api/ticket/:id
// @desc   Get project tickets
// @access Public
router.get('/:projectId', ticketController.getTickets);

// @route  PATCH api/ticket/position
// @desc   Change project tickets position
// @access Public
router.patch('/position', middlewaresChangePositionTicket, ticketController.changeTicketsPosition);

export default router;
