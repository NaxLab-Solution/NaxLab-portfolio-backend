import {z} from 'zod'
export const memberValidationSchema = z.object({
    body: z.object({
      name: z.string(),
      designation:z.string(),
      bio:z.string(),
      avatar:z.string().optional()
    }),
  });