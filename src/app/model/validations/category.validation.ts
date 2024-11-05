// category.validation.ts

import { z } from 'zod';

export const categoryValidationSchema = z.object({
  body:z.object({
    name: z.string(),
    project: z.array(z.string()).optional(),
  })

});