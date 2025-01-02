// testimonial.route.ts

import { Router } from 'express';
import { TestimonialControllers } from './testimonial.controller';
import validateRequest from '../../middlewares/validateRequest';
import { testimonialValidationSchema } from '../../model/validations/testimonial.validation';
import upload from '../../utils/multer';

const testimonial = Router();
testimonial.get('/', TestimonialControllers.GetTestimonials);
testimonial.get('/:id', TestimonialControllers.GetTestimonialById);
testimonial.post('/create', upload.single('avatar'), validateRequest(testimonialValidationSchema), TestimonialControllers.CreateTestimonial);
testimonial.put('/:id', upload.single('avatar'), validateRequest(testimonialValidationSchema), TestimonialControllers.UpdateTestimonial);
testimonial.delete('/:id', TestimonialControllers.DeleteTestimonial);
export const TestimonialRoutes = testimonial;
