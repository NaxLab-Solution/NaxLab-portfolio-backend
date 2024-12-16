// category.controller.ts
import { RequestHandler } from "express"
import { CategoryModel } from "../../model/category.model"
import { Repository } from "../../repository/impementation/Repository"
import catchAsync from "../../utils/catchAsync"
import ErrorHandler from "../../utils/ErrorHandler"
import sendResponse from "../../utils/sendResponse"
//Cateogry Repository
const _categoryRepository = new Repository(CategoryModel)
//Get All Category
const GetCategories = catchAsync(async (req, res, next)=>{
try {
    const categories = await _categoryRepository.findAll();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Categories found successfully',
        data: categories,
      })
} catch (error) {
    next(new ErrorHandler("Internal Server Error", 500))
}

})


    //get by id
    const GetCategoryById:RequestHandler = catchAsync(async (req, res, next)=>{
        const {id} = req.params
        try {
            
        const category = await _categoryRepository.findById(id)
        sendResponse(res, {
          success: true,
          statusCode: 200,
          message: 'Category found successfully',
          data: category,
        })
        } catch (error) {
          return  next(new ErrorHandler("Internal Server Error", 500))
        }
     })

     //create
const CreateCategory:RequestHandler =  catchAsync(async (req, res, next)=>{
    const {name} = req.body
    try {
        
    if(await _categoryRepository.findOne({name})) return next(new ErrorHandler(`Duplicate category`, 400))
  
        const category = await _categoryRepository.create(req.body )
        
        if(!category)
        return next( new ErrorHandler('Invalid entity', 400))
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Category created successfully',
            data: category,
        })
    } catch (error) {
        
        return  next(new ErrorHandler("Internal Server Error", 500))
    }
    })

    //update
    const UpdateCategory:RequestHandler = catchAsync(async(req, res, next)=>{
        const {id} = req.params
        try {
        const category = await _categoryRepository.update(id,req.body)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Category updated successfully',
        data: category,
    })
        } catch (error) {
            
          return  next(new ErrorHandler("Internal Server Error", 500))
        }
    })

    //delete
    const DeleteCategory:RequestHandler = catchAsync(async(req, res, next)=>{
        const {id} = req.params
        try {
            
        const category = await _categoryRepository.delete(id);
        if(!category)return next(new ErrorHandler(`Error deleting category`, 400))
            sendResponse(res, {
                success: true,
                statusCode: 200,
                message: 'Category deleted successfully',
                data: category,
            })
        } catch (error) {
            
          return  next(new ErrorHandler("Internal Server Error", 500))
        }
    
    })
export const CategoryControllers = {GetCategories, GetCategoryById, CreateCategory, UpdateCategory,DeleteCategory}
