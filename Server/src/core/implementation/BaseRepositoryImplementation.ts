import { BaseRepository } from "../repositories/BaseRepository";
import { db } from "../../infrastructure/database/db";
import { sql, eq } from "drizzle-orm";
import { PgTransaction } from "drizzle-orm/pg-core";

export class BaseRepositoryImplementation<T> implements BaseRepository<T> {
  protected table: any;
  protected mapper: {
    fromEntityToDB: (entity: T) => any;
    fromDBToEntity: (row: any) => T;
  };

  constructor(
    table: any,
    mapper: {
      fromEntityToDB: (entity: T) => any;
      fromDBToEntity: (row: any) => T;
    }
  ) {
    this.table = table;
    this.mapper = mapper;
  }

  async getAll(tx?: PgTransaction<any, any, any> | null): Promise<T[]> {
    const result = await (tx
      ? tx.select().from(this.table).where(sql`deletion_date IS NULL`)
      : db.select().from(this.table).where(sql`deletion_date IS NULL`));

    return result.map((row: any) => this.mapper.fromDBToEntity(row));
  }

  async getById(id: number, tx?: PgTransaction<any, any, any> | null): Promise<T | null> {
    const result = await (tx
      ? tx.select().from(this.table).where(sql`Id = ${id} AND deletion_date IS NULL`).limit(1)
      : db.select().from(this.table).where(sql`Id = ${id} AND deletion_date IS NULL`).limit(1));

    return result.length > 0 ? this.mapper.fromDBToEntity(result[0]) : null;
  }

  async create(entity: T, tx?: PgTransaction<any, any, any> | null): Promise<T> {
    const dbEntity = this.mapper.fromEntityToDB(entity);

    const createdEntity = await (tx
      ? tx.insert(this.table).values(dbEntity).returning()
      : db.insert(this.table).values(dbEntity).returning());

    return this.mapper.fromDBToEntity(createdEntity[0]);
  }

  async update(entity: T, tx?: PgTransaction<any, any, any> | null): Promise<T> {
    const dbEntity = this.mapper.fromEntityToDB(entity);

    const updatedEntity = await (tx
      ? tx.update(this.table).set(dbEntity).where(eq(this.table.Id, dbEntity.Id)).returning()
      : db.update(this.table).set(dbEntity).where(eq(this.table.Id, dbEntity.Id)).returning());

    return this.mapper.fromDBToEntity(updatedEntity[0]);
  }

  async delete(id: number, tx?: PgTransaction<any, any, any> | null): Promise<any> {
    const result = await (tx
      ? tx.update(this.table).set({ DeletionDate: new Date().toISOString() }).where(eq(this.table.Id, id)).returning()
      : db.update(this.table).set({ DeletionDate: new Date().toISOString() }).where(eq(this.table.Id, id)).returning());

    return result;
  }
}
