import { Document } from 'mongoose';

export interface TicketInterface extends Document {
  projectId: string;
  title: string;
  descr: Array<Record<string, string | Array<Record<string, string | boolean>>>>;
  index: number;
  keyNumber: number;
  columnId: string;
}
