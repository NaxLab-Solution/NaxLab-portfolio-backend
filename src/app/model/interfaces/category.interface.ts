import { ObjectId } from "mongoose";

import { Document } from "mongoose";

// category.interface.ts
export interface TCategory extends Document {
  name:string,
  project: ObjectId[]
  }
  
