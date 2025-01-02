// company.validation.ts

import { z } from 'zod';

export const companyValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    logo: z.string().optional(),
  }),
});
