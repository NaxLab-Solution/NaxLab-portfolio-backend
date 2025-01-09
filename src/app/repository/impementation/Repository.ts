import { Model, Document, FilterQuery, UpdateQuery, PopulateOptions } from 'mongoose';
import { IRepository } from '../IRepository';
import ErrorHandler from '../../utils/ErrorHandler';

export class Repository<T extends Document> implements IRepository<T> {
  private model: Model<T>;
  /**
   *
   */
  constructor(model: Model<T>) {
    this.model = model;
  }
  create(entity: T): Promise<T | null> {
    if (!entity) {
      throw new ErrorHandler('Entity cannot be empty', 400);
    }
    return this.model.create(entity);
  }
  findById(id: string): Promise<T | null> {
    if (!id) throw new ErrorHandler(`Internal error occured`, 400);
    const entity = this.model.findById(id).exec()
    if(!entity) throw new ErrorHandler("No entity found", 404);
    return entity;
  }
  findOne(query: FilterQuery<T>): Promise<T | null> {
    if (!query) throw new ErrorHandler(`Internal error occured`, 400);
    return this.model.findOne(query).exec();
  }
  findAll(query: FilterQuery<T> = {}, populateOptions?: PopulateOptions | string | (PopulateOptions | string)[]): Promise<T[] | null> {
    const queryChain = this.model.find(query);

    if (populateOptions) {
            queryChain.populate(Array.isArray(populateOptions) ? populateOptions : [populateOptions]);
    }

    return queryChain.exec().then((entities: any) => {
        if (entities.length === 0 || !entities) {
            throw new ErrorHandler("No entities were found", 404);
        }
        return entities;
    });
}
  async update(id: string, entity: UpdateQuery<T>): Promise<T | null> {
    if (!id) throw new ErrorHandler('Entity not found', 400);
    if (!entity) throw new ErrorHandler('Invalid entity', 400);
    const existing = await this.findById(id)
    if(!existing) throw new ErrorHandler(`No such element found`, 404);

    return this.model.findByIdAndUpdate(id, entity, { new: true });
  }

  async delete(id: string): Promise<T | null> {
    if (!id) throw new ErrorHandler('Invalid entity', 400);
    const existing = await this.findById(id);
    if(!existing) throw new ErrorHandler(`No such element found`, 404);
    return this.model.findByIdAndDelete(id);
  }
}
