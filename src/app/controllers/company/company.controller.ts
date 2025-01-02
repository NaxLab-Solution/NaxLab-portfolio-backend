// company.controller.ts

import { RequestHandler } from 'express';
import { Repository } from '../../repository/impementation/Repository';
import catchAsync from '../../utils/catchAsync';
import ErrorHandler from '../../utils/ErrorHandler';
import sendResponse from '../../utils/sendResponse';
import { CompanyModel } from '../../model/company.model';

//generic repository
const _companyRepository = new Repository(CompanyModel);

//get all
const GetCompanies: RequestHandler = catchAsync(async (req, res, next) => {
  const companies = await _companyRepository.findAll();
  if (!companies || companies.length === 0) {
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'No companies found',
      data: companies,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'companies found successfully',
    data: companies,
  });
});
//get by id
const GetCompanyById: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const company = await _companyRepository.findById(id);
  if (!company) {
    return next(new ErrorHandler('company not found', 404));
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'company found successfully',
    data: company,
  });
});

//create
const CreateCompany: RequestHandler = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  if (await _companyRepository.findOne({ name }))
    return next(new ErrorHandler(`Duplicate company`, 400));
  //convert base64 to buffer for avatar
  let base64 = req.file ? req.file.buffer.toString('base64') : undefined;
  const company = await _companyRepository.create({
    ...req.body,
    logo: base64,
  });

  if (!company) return next(new ErrorHandler('Invalid entity', 400));
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Company created successfully',
    data: company,
  });
});

//update
const UpdateCompany: RequestHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    try {
      let company;
      if (req.file) {
        let base64 = req.file ? req.file.buffer.toString('base64') : undefined;
        company = await _companyRepository.update(id, {
          ...req.body,
          logo: base64,
        });
      } else {
        company = await _companyRepository.update(id, req.body);
      }
  
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Company updated successfully',
        data: company,
      });
    } catch (error) {
      return next(new ErrorHandler('Internal Server Error', 500));
    }
  });
  //delete
const DeleteCompany: RequestHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const company = await _companyRepository.delete(id);
    if (!company) return next(new ErrorHandler(`Error deleting company`, 400));
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Company deleted successfully',
      data: company,
    });
  });
export const CompanyControllers = {DeleteCompany, UpdateCompany, CreateCompany, GetCompanyById, GetCompanies};
