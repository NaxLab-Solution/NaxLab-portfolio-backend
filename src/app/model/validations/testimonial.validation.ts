// testimonial.validation.ts

import { z } from 'zod';
export const testimonialValidationSchema = z.object({
 body:z.object({
  name: z.string(),
  title:z.string(),
  avatar: z.string().optional(),
  comment_platform: z.string(),
  comment: z.string(),
  rating: z.number().int().min(1).max(5).optional(),
 })
});
