// tag.route.ts

import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { tagValidationSchema } from '../../model/validations/tag.validation';
import { TagControllers } from './tag.controller';

const tag = Router();

//get by id
tag.get('/:id', TagControllers.GetTagById)

//get all members
tag.get(`/`, TagControllers.GetTags)

//create
tag.post(`/create`, validateRequest(tagValidationSchema),TagControllers.CreateTag)
//Update
tag.put(`/:id`, validateRequest(tagValidationSchema), TagControllers.UpdateTag)
//Delete
tag.delete(`/:id`, TagControllers.DeleteTag)


export const TagRoutes = tag;
