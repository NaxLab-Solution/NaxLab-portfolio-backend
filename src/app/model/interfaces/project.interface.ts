// project.interface.ts
import { Document } from "mongoose";

import { ObjectId } from "mongoose";

export interface TProject extends Document{

    title:string,
    description:string,
    primary_image:string,
    secondary_image:string,
    category:ObjectId, 
    tag:ObjectId,
  
}
