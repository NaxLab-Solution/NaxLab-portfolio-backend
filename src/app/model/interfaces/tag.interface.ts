// tag.interface.ts

import { Document } from "mongoose";

import { ObjectId } from "mongoose";

export interface TTag extends Document{

    name:string,
    project:ObjectId[]
   
}
