import { Document,FilterQuery, PopulateOptions, UpdateQuery } from "mongoose";

export interface IRepository<T extends Document> {
    create(entity: T):Promise<T|null>;
    findById(id:string):Promise<T|null>;
    findOne(query:FilterQuery<T>):Promise<T|null>;
    findAll(
        query?: FilterQuery<T>, 
        populateOptions?: PopulateOptions | string | (PopulateOptions | string)[]
    ): Promise<T[] | null>;
    update(id:string, entity:UpdateQuery<T>):Promise<T|null>;
    delete(id:string):Promise<T|null>;
}