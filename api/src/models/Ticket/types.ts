import { Document } from 'mongoose';

export interface TicketInterface extends Document {
  projectId: string;
  title: string;
  descr: string;
  index: number;
  keyNumber: number;
  columnId: string;
}
