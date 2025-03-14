import { PgTransaction } from "drizzle-orm/pg-core";

export interface BaseRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | null>;
  create(entity: T, tx: PgTransaction<any, any, any> | null): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}
