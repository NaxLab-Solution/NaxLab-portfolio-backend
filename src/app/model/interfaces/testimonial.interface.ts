// testimonial.interface.ts

        
        import { Document } from "mongoose";

export interface TTestimonial extends Document{
  name:string,
  avatar:string,
  comment_platform:string,  
  comment:string,
  rating:number,
}
