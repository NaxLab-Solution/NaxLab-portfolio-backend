// company.model.ts

import { Schema, model, Document } from 'mongoose';
import { TCompany } from './interfaces/company.interface';


const companySchema = new Schema<TCompany>({
  name: { type: String },
  logo: { type: String },
});

export const CompanyModel = model<TCompany>('Company', companySchema);
