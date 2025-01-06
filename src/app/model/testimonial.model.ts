// testimonial.model.ts

import { Schema, model, Document } from 'mongoose';
import { TTestimonial } from './interfaces/testimonial.interface';


const testimonialSchema = new Schema<TTestimonial>({

  name:{type:String},
  title:{type:String},
  avatar:{type:String},
  comment_platform:{type:String},
  comment:{type:String},
  rating:{type:Number, minimum:1, maximum:5},

});

export const TestimonialModel = model<TTestimonial>('Testimonial', testimonialSchema);
