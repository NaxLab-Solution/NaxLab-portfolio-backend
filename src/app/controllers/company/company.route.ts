// company.route.ts

import { Router } from 'express';
import { CompanyControllers } from './company.controller';
import validateRequest from '../../middlewares/validateRequest';
import { companyValidationSchema } from '../../model/validations/company.validation';
import upload from '../../utils/multer';

const company = Router();
company.get('/', CompanyControllers.GetCompanies);
company.get('/:id', CompanyControllers.GetCompanyById);
company.post('/create', upload.single('logo'), validateRequest(companyValidationSchema), CompanyControllers.CreateCompany);
company.put('/:id', upload.single('logo'), validateRequest(companyValidationSchema), CompanyControllers.UpdateCompany);
company.delete('/:id', CompanyControllers.DeleteCompany);
export const CompanyRoutes = company;
