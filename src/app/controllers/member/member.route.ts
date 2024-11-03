import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { memberValidationSchema } from '../../model/validations/member.validation';
import { MemberControllers } from './member.controller';
const member = express.Router();

//get by id
member.get('/:id', MemberControllers.GetMemberById)

//get all members
member.get(`/`, MemberControllers.GetMembers)

//create
member.post(`/create`, validateRequest(memberValidationSchema),MemberControllers.CreateMember)
export const memberRoute = member