
import {Model, Document, FilterQuery, UpdateQuery} from 'mongoose'
import { IRepository } from '../IRepository'
import ErrorHandler from '../../utils/ErrorHandler';

export class Repository<T extends Document> implements IRepository<T>{
    private model:Model<T>;
    /**
     *
     */
    constructor(model:Model<T>) {
       this.model = model;
        
    }
    create(entity: T): Promise<T | null> {
        if(!entity) { new ErrorHandler('Entity cannot be empty', 400);}
        return this.model.create(entity);
    }
    findById(id: string): Promise<T | null> {
        if(!id) throw new ErrorHandler(`Internal error occured`, 400)
            return this.model.findById(id).exec()
    }
    findOne(query: FilterQuery<T>): Promise<T | null> {
        if(!query) throw new ErrorHandler(`Internal error occured`,400)
        return this.model.findOne(query).exec()    
        }
    findAll(): Promise<T[] | null> {
        return this.model.find().exec()
    }
    update(id: string, entity: UpdateQuery<T>): Promise<T | null> {
        if(!id) throw new ErrorHandler('Entity not found', 400)
            if(!entity) throw new ErrorHandler('Invalid entity', 400)
        return this.model.findByIdAndUpdate(id, entity, {new: true})
    }
    delete(id: string): Promise<T | null> {
        if(!id) throw new ErrorHandler('Invalid entity', 400)
            return this.model.findByIdAndDelete(id)
    }

}