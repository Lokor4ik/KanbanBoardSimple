import { Document } from 'mongoose';

export interface ProjectInterface extends Document {
  name: string;
  key: string;
  lead: string;
}
