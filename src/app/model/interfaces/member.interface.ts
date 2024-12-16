import { Document } from "mongoose";

export interface TMember extends Document {
    name:string,
    designation:string,
    bio:string, 
    avatar:string,
  }