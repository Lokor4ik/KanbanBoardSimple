import mongoose, { Schema } from 'mongoose';

import { TicketInterface } from './types';

const TicketSchema = new Schema({
  projectId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  descr: {
    type: String,
  },
  index: {
    type: Number,
    required: true,
  },
  keyNumber: {
    type: Number,
    required: true,
  },
  columnId: {
    type: String,
    required: true,
  },
});

export const Ticket = mongoose.model<TicketInterface>('ticket', TicketSchema);

export default Ticket;
