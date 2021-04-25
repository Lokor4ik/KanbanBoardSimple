import express from 'express';
import { check } from 'express-validator';

import ticketController from '../controllers/ticket/ticket';

const router = express.Router();

const commonMiddlewares1 = [check('projectId', 'Project id is required').not().isEmpty()];
const commonMiddlewares2 = [check('title', 'Title is required').not().isEmpty()];
const commonMiddlewares3 = [check('ticketId', 'Ticket id is required').not().isEmpty()];

const middlewaresCreateNewTicket = [
  ...commonMiddlewares1,
  ...commonMiddlewares2,
  check('columnId', 'Column id is required').not().isEmpty(),
  check('keyNumber', 'Key number id is required').not().isEmpty(),
  check('index', 'Index is required').not().isEmpty(),
];

const middlewaresChangePositionTicket = [...commonMiddlewares1, check('updatedTickets', 'Updated tickets is required').not().isEmpty()];

const middlewaresChangeCurrentTicket = [
  ...commonMiddlewares1,
  ...commonMiddlewares2,
  ...commonMiddlewares3,
  check('descr', 'Description is required').not().isEmpty(),
];

const middlewaresDeleteCurrentTicket = [...commonMiddlewares1, ...commonMiddlewares3];

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

// @route  PATCH api/ticket
// @desc   Change current ticket info
// @access Public
router.patch('/', middlewaresChangeCurrentTicket, ticketController.changeCurrentTicket);

// @route  DELETE api/ticket
// @desc   Delete current ticket
// @access Public
router.delete('/', middlewaresDeleteCurrentTicket, ticketController.deleteCurrentTicket);

export default router;
