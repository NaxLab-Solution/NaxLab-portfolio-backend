// category.route.ts

import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { categoryValidationSchema } from '../../model/validations/category.validation';
import { CategoryControllers } from './category.controller';
const category = Router();

//get by id
category.get('/:id', CategoryControllers.GetCategoryById)

//get all members
category.get(`/`, CategoryControllers.GetCategories)

//create
category.post(`/create`,validateRequest(categoryValidationSchema),CategoryControllers.CreateCategory)
//Update
category.put(`/:id`, validateRequest(categoryValidationSchema), CategoryControllers.UpdateCategory)
//Delete
category.delete(`/:id`, CategoryControllers.DeleteCategory)
export const CategoryRoutes = category;
