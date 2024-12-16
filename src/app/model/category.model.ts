// category.model.ts

import { Schema, model, Document, ObjectId } from 'mongoose';
import { TCategory } from './interfaces/category.interface';


const categorySchema = new Schema<TCategory>({
  
  name: { type: String, required: true },
});

export const CategoryModel = model<TCategory>('Category', categorySchema);
