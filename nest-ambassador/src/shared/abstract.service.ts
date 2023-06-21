import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractService {
  constructor(protected readonly repository: Repository<any>) {}

  async save(entity: any) {
    return this.repository.save(entity);
  }

  async find(options: FindManyOptions<any>) {
    return this.repository.find(options);
  }

  async findOne(where: FindOptionsWhere<any> | FindOptionsWhere<any>[]) {
    return this.repository.findOneBy(where);
  }

  async update(id: string, partialEntity: QueryDeepPartialEntity<any>) {
    return this.repository.update(id, partialEntity);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
