// testimonial.controller.ts

import { RequestHandler } from 'express';
import { Repository } from '../../repository/impementation/Repository';
import catchAsync from '../../utils/catchAsync';
import ErrorHandler from '../../utils/ErrorHandler';
import sendResponse from '../../utils/sendResponse';
import { TestimonialModel } from '../../model/testimonial.model';

// Instantiate the repository with the Testimonial model
const _testimonialRepository = new Repository(TestimonialModel);

//get all
const GetTestimonials: RequestHandler = catchAsync(async (req, res, next) => {
  const testimonials = await _testimonialRepository.findAll();
  if (!testimonials || testimonials.length === 0) {
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'No testimonials found',
      data: testimonials,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Testimonials retrieved successfully',
    data: testimonials,
  });
});

//get by id

const GetTestimonialById: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const testimonial = await _testimonialRepository.findById(id);
    if (!testimonial) {
      return next(new ErrorHandler('Testimonial not found', 404));
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Testimonial retrieved successfully',
      data: testimonial,
    });
  },
);

//create
const CreateTestimonial: RequestHandler = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  if (await _testimonialRepository.findOne({ name }))
    return next(new ErrorHandler(`Duplicate testimonial`, 400));
  let base64 = req.file ? req.file.buffer.toString('base64') : undefined;
  const testimonial = await _testimonialRepository.create({
    ...req.body,
    avatar: base64,
  });
  if (!testimonial) return next(new ErrorHandler('Invalid entity', 400));
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Testimonial created successfully',
    data: testimonial,
  });
});

//update
const UpdateTestimonial: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  try {
    let testimonial;
    if (req.file) {
      let base64 = req.file ? req.file.buffer.toString('base64') : undefined;
      testimonial = await _testimonialRepository.update(id, {
        ...req.body,
        avatar: base64,
      });
    } else {
      testimonial = await _testimonialRepository.update(id, req.body);
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Testimonial updated successfully',
      data: testimonial,
    });
  } catch (error) {
    return next(new ErrorHandler('Internal Server Error', 500));
  }
});

//delete
const DeleteTestimonial: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const testimonial = await _testimonialRepository.delete(id);
  if (!testimonial) return next(new ErrorHandler(`Error deleting testimonial`, 400));
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Testimonial deleted successfully',
    data: testimonial,
  });
});
export const TestimonialControllers = {DeleteTestimonial, UpdateTestimonial, CreateTestimonial, GetTestimonialById, GetTestimonials};
