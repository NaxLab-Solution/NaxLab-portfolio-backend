import { RequestHandler } from "express";
import { TagModel } from "../../model/tag.model"
import { Repository } from "../../repository/impementation/Repository"
import catchAsync from "../../utils/catchAsync";
import ErrorHandler from "../../utils/ErrorHandler";
import sendResponse from "../../utils/sendResponse";

// tag.controller.ts
const _tagRepository = new Repository(TagModel)

//Get All Category
const GetTags = catchAsync(async (req, res, next)=>{
    try {
        const tags = await _tagRepository.findAll();
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Tags found successfully',
            data: tags,
          })
    } catch (error) {
        next(new ErrorHandler("Internal Server Error", 500))
    }
    
    })
    
    
        //get by id
        const GetTagById:RequestHandler = catchAsync(async (req, res, next)=>{
            const {id} = req.params
            try {
                
            const tag = await _tagRepository.findById(id)
            sendResponse(res, {
              success: true,
              statusCode: 200,
              message: 'Tag found successfully',
              data: tag,
            })
            } catch (error) {
              return  next(new ErrorHandler("Internal Server Error", 500))
            }
         })
    
         //create
    const CreateTag:RequestHandler =  catchAsync(async (req, res, next)=>{
        const {name} = req.body
        try {
            
        if(await _tagRepository.findOne({name})) return next(new ErrorHandler(`Duplicate tag`, 400))
      
            const tag = await _tagRepository.create(req.body )
            
            if(!tag)
            return next( new ErrorHandler('Invalid entity', 400))
            sendResponse(res, {
                success: true,
                statusCode: 200,
                message: 'Tag created successfully',
                data: tag,
            })
        } catch (error) {
            
            return  next(new ErrorHandler("Internal Server Error", 500))
        }
        })
    
        //update
        const UpdateTag:RequestHandler = catchAsync(async(req, res, next)=>{
            const {id} = req.params
            try {
            const tag = await _tagRepository.update(id,req.body)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Tag updated successfully',
            data: tag,
        })
            } catch (error) {
                
              return  next(new ErrorHandler("Internal Server Error", 500))
            }
        })
    
        //delete
        const DeleteTag:RequestHandler = catchAsync(async(req, res, next)=>{
            const {id} = req.params
            try {
                
            const tag = await _tagRepository.delete(id);
            if(!tag)return next(new ErrorHandler(`Error deleting tag`, 400))
                sendResponse(res, {
                    success: true,
                    statusCode: 200,
                    message: 'Tag deleted successfully',
                    data: tag,
                })
            } catch (error) {
                
              return  next(new ErrorHandler("Internal Server Error", 500))
            }
        
        })
export const TagControllers = {GetTags, GetTagById, CreateTag, UpdateTag, DeleteTag}
