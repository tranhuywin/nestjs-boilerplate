import { NotFoundException } from '@nestjs/common'
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate'
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
  UpdateResult,
} from 'typeorm'

import { AbstractEntity } from './abstract.entity'

/**
 * Abstract service class is a base class for all services in the application.
 * It provides a common interface for all services to interact with the database.
 * @template E - The entity type
 * @param {Repository<E>} repository - The repository for the entity
 */
export class AbstractService<E extends AbstractEntity> {
  constructor(private readonly repository: Repository<E>) {}

  getRepo(): Repository<E> {
    return this.repository
  }

  async exist(options?: FindManyOptions<E>): Promise<boolean> {
    return this.repository.exist(options)
  }

  /**
   * Finds one entity by the given options.
   * @param {FindOneOptions<E>} options - The options to find the entity.
   * @returns {Promise<E | null>} The found entity or null if not found.
   */
  async findOne(options: FindOneOptions<E>): Promise<E | null> {
    return this.repository.findOne(options)
  }

  /**
   * Finds one entity by the given where condition.
   * @param {FindOptionsWhere<E> | FindOptionsWhere<E>[]} where - The where condition to find the entity.
   * @returns {Promise<E | null>} The found entity or null if not found.
   */
  findOneBy(where: FindOptionsWhere<E> | FindOptionsWhere<E>[]): Promise<E | null> {
    return this.repository.findOneBy(where)
  }

  /**
   * Finds all entities by the given options.
   * @param {FindManyOptions<E>} options - The options to find the entities.
   * @returns {Promise<E[]>} The found entities.
   */
  find(options?: FindManyOptions<E>): Promise<E[]> {
    return this.repository.find(options)
  }

  /**
   * Finds all entities by the given where condition.
   * @param {FindOptionsWhere<E> | FindOptionsWhere<E>[]} where - The where condition to find the entities.
   * @returns {Promise<E[]>} The found entities.
   */
  findBy(where: FindOptionsWhere<E> | FindOptionsWhere<E>[]): Promise<E[]> {
    return this.repository.findBy(where)
  }

  /**
   * Saves a new entity or updates an existing one.
   * @param {DeepPartial<E>} data - The data to save the entity.
   * @param {SaveOptions} options - The options to save the entity.
   * @returns {Promise<E>} The saved entity.
   */
  save(data: DeepPartial<E>, options?: SaveOptions): Promise<E> {
    const entity = this.repository.create(data)
    return this.repository.save(entity, options)
  }

  /**
   * Saves a batch of entities.
   * @param {E[]} entities - The entities to save.
   * @param {SaveOptions} options - The options to save the entities.
   * @returns {Promise<E[]>} The saved entities.
   */
  saveBatch(entities: E[], options?: SaveOptions): Promise<E[]> {
    return this.repository.save(entities, options)
  }

  /**
   * Updates an existing entity.
   * @param {DeepPartial<E>} partialEntity - The partial entity to update.
   * @returns {Promise<E>} The updated entity.
   */
  update(partialEntity: DeepPartial<E>): Promise<E> {
    return this.patchOne(partialEntity)
  }

  /**
   * Patches an existing entity.
   * @param {DeepPartial<E>} partialEntity - The partial entity to patch.
   * @returns {Promise<E>} The patched entity.
   */
  async patchOne(partialEntity: DeepPartial<E>): Promise<E> {
    const entity: E | undefined = await this.repository.preload(partialEntity)
    if (!entity) throw new NotFoundException('Entity not found')
    return this.repository.save(entity)
  }

  /**
   * Softly removes an entity by the given where condition.
   * @param {FindOptionsWhere<E> | FindOptionsWhere<E>[]} where - The where condition to remove the entity.
   * @returns {Promise<E>} The removed entity.
   */
  async softRemove(where: FindOptionsWhere<E> | FindOptionsWhere<E>[]): Promise<E | null> {
    const entity = await this.findOneBy(where)
    if (!entity) {
      return null
    }
    return this.repository.softRemove(entity)
  }

  /**
   * Restores a soft-removed entity by the given id.
   * @param {number} id - The id of the entity to restore.
   * @returns {Promise<UpdateResult>} The result of the restore operation.
   */
  restore(id: number): Promise<UpdateResult> {
    return this.repository.restore(id)
  }

  /**
   * Softly removes a batch of entities.
   * @param {E[]} entities - The entities to remove.
   * @param {SaveOptions} options - The options to remove the entities.
   * @returns {Promise<E[]>} The removed entities.
   */
  softRemoveByEntities(entities: E[], options?: SaveOptions): Promise<E[]> {
    return this.repository.softRemove(entities, options)
  }

  /**
   * Counts the number of entities that match the given options.
   * @param {FindManyOptions<E>} options - The options to count the entities.
   * @returns {Promise<number>} The count of entities.
   */
  count(options?: FindManyOptions<E>): Promise<number> {
    return this.repository.count(options)
  }

  /**
   * Paginate the entities based on the given query and options.
   * @param {FindOptionsWhere<E>} where - The where condition to paginate the entities.
   * @param {IPaginationOptions} options - The options to paginate the entities.
   * @returns {Promise<Pagination<E>>} The paginated entities.
   */
  paginate(where: FindOptionsWhere<E>, options: IPaginationOptions): Promise<Pagination<E>> {
    return paginate<E>(this.repository, options, { where })
  }

  /**
   * Deletes entities by the given where condition.
   * @param {FindOptionsWhere<E>} where - The where condition to delete the entities.
   * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
   */
  async deleteByWhere(where: FindOptionsWhere<E>): Promise<boolean> {
    const result = await this.repository.delete(where)
    return Boolean(result.affected)
  }
}
