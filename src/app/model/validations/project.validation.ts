import { z } from 'zod';

export const projectValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    images: z.array(z.string()).optional(),  
    category: z.string().optional(),        
    tag: z.array(z.string()).optional(),             
  }),
});