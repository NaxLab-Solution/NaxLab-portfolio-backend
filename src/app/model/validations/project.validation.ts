import { z } from 'zod';

export const projectValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    image: z.array(z.string()).optional(),  
    category: z.string().optional(),        
    tag: z.string().optional(),             
  }),
});