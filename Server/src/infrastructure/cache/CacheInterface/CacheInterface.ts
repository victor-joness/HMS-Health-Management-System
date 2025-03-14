export interface CacheInterface {
  // Métodos básicos
  set(key: string, value: any, ttl?: number): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  
  // Métodos auxiliares
  exists(key: string): Promise<boolean>;
  increment(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<void>;
  
  // Métodos para coleções
  setHash(key: string, field: string, value: any): Promise<void>;
  getHash<T>(key: string, field: string): Promise<T | null>;
  getAllHash<T>(key: string): Promise<Record<string, T>>;
  
  // Métodos para listas
  pushToList(key: string, value: any): Promise<void>;
  getList<T>(key: string): Promise<T[]>;
  
  // Métodos para conjuntos
  addToSet(key: string, value: any): Promise<void>;
  getSet<T>(key: string): Promise<Set<T>>;
} 