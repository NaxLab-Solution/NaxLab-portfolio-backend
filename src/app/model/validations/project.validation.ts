import { z } from 'zod';

export const projectValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    primary_image: z.string().optional(),
    secondary_image: z.string().optional(),
    category: z.string().optional(),        
    tag: z.array(z.string()).optional(),             
  }),
});