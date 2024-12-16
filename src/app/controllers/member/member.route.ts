import  { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { memberValidationSchema } from '../../model/validations/member.validation';
import { MemberControllers } from './member.controller';
import upload from '../../utils/multer';
const member = Router();

//get by id
member.get('/:id', MemberControllers.GetMemberById)

//get all members
member.get(`/`, MemberControllers.GetMembers)

//create
member.post(`/create`, upload.single('avatar'),validateRequest(memberValidationSchema),MemberControllers.CreateMember)
//Update
member.put(`/:id`,upload.single('avatar'), validateRequest(memberValidationSchema), MemberControllers.UpdateMember)
//Delete
member.delete(`/:id`, MemberControllers.DeleteMember)
export const memberRoute = member