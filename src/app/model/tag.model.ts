// tag.model.ts

import { Schema, model,  } from 'mongoose';
import { TTag } from './interfaces/tag.interface';


const tagSchema = new Schema<TTag>({
  name:{type: 'string', required: true},
  project: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});

export const TagModel = model<TTag>('Tag', tagSchema);
