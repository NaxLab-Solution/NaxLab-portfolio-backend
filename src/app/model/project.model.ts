// project.model.ts

import  { Schema, model } from 'mongoose';
import { TProject } from './interfaces/project.interface';


const projectSchema = new Schema<TProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  primary_image: { type: String },
  secondary_image: { type: String },
  category: { type: Schema.Types.ObjectId,ref:'Category', required:true},
  tag: [{ type: Schema.Types.ObjectId,ref:'Tag' }],
});

export const ProjectModel =  model<TProject>('Project', projectSchema);
