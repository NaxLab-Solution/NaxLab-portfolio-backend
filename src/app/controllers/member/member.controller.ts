import { RequestHandler } from "express"
import { MemberModel } from "../../model/member.model"
import { Repository } from "../../repository/impementation/Repository"
import catchAsync from "../../utils/catchAsync"
import ErrorHandler from "../../utils/ErrorHandler"
import sendResponse from "../../utils/sendResponse"
//generic repository
const _memberRepository = new Repository(MemberModel)
//get all
const GetMembers:RequestHandler = catchAsync(async (req, res, next)=>{
    const members = await _memberRepository.findAll()
    if(members?.length == 0 || members == null)
    return next( new ErrorHandler('No elements found', 404))
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Members found successfully',
        data: members,
    })
    })
    //get by id
    const GetMemberById:RequestHandler = catchAsync(async (req, res, next)=>{
        const {id} = req.params
        const member = await _memberRepository.findById(id)
        if(!member)
        return next(new ErrorHandler(`No such element found`, 404))
     
        sendResponse(res, {
          success: true,
          statusCode: 200,
          message: 'Member found successfully',
          data: member,
        })
     })

     //create
const CreateMember:RequestHandler =  catchAsync(async (req, res, next)=>{
    const {name} = req.body
    if(await _memberRepository.findOne({name})) return next(new ErrorHandler(`Duplicate username`, 400))
    //convert base64 to buffer for avatar
    let base64 = req.file ? req.file.buffer.toString('base64'): undefined; 
    const member = await _memberRepository.create({...req.body, avatar:base64 })
    
    if(!member)
    return next( new ErrorHandler('Invalid entity', 400))
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Member created successfully',
        data: member,
    })
    })

    //update
    const UpdateMember:RequestHandler = catchAsync(async(req, res, next)=>{
        const {id} = req.params
        const member = await _memberRepository.update(id, req.body)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Member updated successfully',
        data: member,
    })
    })
    
    //delete
    const DeleteMember:RequestHandler = catchAsync(async(req, res, next)=>{
        const {id} = req.params
        const member = await _memberRepository.delete(id);
        if(!member)return next(new ErrorHandler(`Error deleting member`, 400))
            sendResponse(res, {
                success: true,
                statusCode: 200,
                message: 'Member deleted successfully',
                data: member,
            })
    
    })
export const MemberControllers = {CreateMember,UpdateMember,DeleteMember, GetMemberById, GetMembers}