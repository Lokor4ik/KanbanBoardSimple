import { Request, Response } from 'express';

import Project from '../../models/Project/Project';
import Ticket from '../../models/Ticket/Ticket';
import { TicketInterface } from '../../models/Ticket/types';

import checkErrors from '../../utils/middlewareErrors';

const createTicket = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { projectId, title, descr, index, keyNumber, columnId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ errors: [{ msg: 'Project not found', severity: 'error' }] });
    }

    const ticketBody = {
      projectId,
      title,
      descr,
      index,
      keyNumber,
      columnId,
    };
    const ticket = new Ticket(ticketBody);

    await ticket.save();

    res.json({ msg: 'Successfully created ticket', severity: 'success' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404).json({ errors: [{ msg: 'One of the IDs is incorrect', severity: 'error' }] });
      return;
    }

    res.status(500).send('Server Error');
  }
};

const getTickets = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ errors: [{ msg: 'Project not found', severity: 'error' }] });
    }

    const tickets = await Ticket.find({ projectId });

    res.json(tickets);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404).json({ errors: [{ msg: 'One of the IDs is incorrect', severity: 'error' }] });
      return;
    }

    res.status(500).send('Server Error');
  }
};

const changeTicketsPosition = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { projectId, updatedTickets } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ errors: [{ msg: 'Project not found', severity: 'error' }] });
    }

    await Ticket.bulkWrite(
      updatedTickets.map((item: TicketInterface) => ({
        updateOne: {
          filter: { _id: item._id },
          update: { $set: item },
        },
      }))
    );

    res.json({ updatedTickets });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404).json({ errors: [{ msg: 'One of the IDs is incorrect', severity: 'error' }] });
      return;
    }

    res.status(500).send('Server Error');
  }
};

export default { createTicket, getTickets, changeTicketsPosition };
