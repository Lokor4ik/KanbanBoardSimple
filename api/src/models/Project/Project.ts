import mongoose, { Schema } from 'mongoose';

import { ProjectInterface } from './types';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  lead: {
    type: String,
    required: true,
  },
  participants: [{ _id: String, name: String, email: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Project = mongoose.model<ProjectInterface>('project', ProjectSchema);

export default Project;
