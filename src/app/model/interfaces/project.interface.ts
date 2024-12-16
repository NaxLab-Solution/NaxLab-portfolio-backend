// project.interface.ts
import { Document } from "mongoose";

import { ObjectId } from "mongoose";

export interface TProject extends Document{

    title:string,
    description:string,
    image:string[],
    category:ObjectId, 
    tag:ObjectId,
  
}
