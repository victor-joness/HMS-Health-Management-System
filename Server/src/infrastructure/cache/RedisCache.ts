import Redis from "ioredis";
import { CacheInterface } from "./CacheInterface/CacheInterface";

export class RedisCache implements CacheInterface {
  private client: Redis;
  private readonly DEFAULT_TTL = 3600; //1 hora

  constructor() {
    this.client = new Redis(
      process.env.REDIS_URL || "redis://default@127.0.0.1:6379", {
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.client.on("error", (error) => {
      console.error("Redis Error:", error);
    });

    this.client.on("connect", () => {
      console.log("Redis connected successfully");
    });
  }

  async set(
    key: string,
    value: any,
    ttl: number = this.DEFAULT_TTL
  ): Promise<void> {
    try {
      await this.client.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error("Redis Set Error:", error);
      throw new Error("Cache set operation failed");
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Redis Get Error:", error);
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error("Redis Delete Error:", error);
      throw new Error("Cache delete operation failed");
    }
  }

  async clear(): Promise<void> {
    try {
      await this.client.flushall();
    } catch (error) {
      console.error("Redis Clear Error:", error);
      throw new Error("Cache clear operation failed");
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      console.error("Redis Exists Error:", error);
      return false;
    }
  }

  async increment(key: string): Promise<number> {
    try {
      return await this.client.incr(key);
    } catch (error) {
      console.error("Redis Increment Error:", error);
      throw new Error("Cache increment operation failed");
    }
  }

  async expire(key: string, seconds: number): Promise<void> {
    try {
      await this.client.expire(key, seconds);
    } catch (error) {
      console.error("Redis Expire Error:", error);
      throw new Error("Cache expire operation failed");
    }
  }

  async setHash(key: string, field: string, value: any): Promise<void> {
    try {
      await this.client.hset(key, field, JSON.stringify(value));
    } catch (error) {
      console.error("Redis Hash Set Error:", error);
      throw new Error("Cache hash set operation failed");
    }
  }

  async getHash<T>(key: string, field: string): Promise<T | null> {
    try {
      const value = await this.client.hget(key, field);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Redis Hash Get Error:", error);
      return null;
    }
  }

  async getAllHash<T>(key: string): Promise<Record<string, T>> {
    try {
      const result = await this.client.hgetall(key);
      return Object.entries(result).reduce((acc, [field, value]) => {
        acc[field] = JSON.parse(value);
        return acc;
      }, {} as Record<string, T>);
    } catch (error) {
      console.error("Redis Get All Hash Error:", error);
      return {};
    }
  }

  async pushToList(key: string, value: any): Promise<void> {
    try {
      await this.client.rpush(key, JSON.stringify(value));
    } catch (error) {
      console.error("Redis List Push Error:", error);
      throw new Error("Cache list push operation failed");
    }
  }

  async getList<T>(key: string): Promise<T[]> {
    try {
      const values = await this.client.lrange(key, 0, -1);
      return values.map((value) => JSON.parse(value));
    } catch (error) {
      console.error("Redis List Get Error:", error);
      return [];
    }
  }

  async addToSet(key: string, value: any): Promise<void> {
    try {
      await this.client.sadd(key, JSON.stringify(value));
    } catch (error) {
      console.error("Redis Set Add Error:", error);
      throw new Error("Cache set add operation failed");
    }
  }

  async getSet<T>(key: string): Promise<Set<T>> {
    try {
      const values = await this.client.smembers(key);
      return new Set(values.map((value) => JSON.parse(value)));
    } catch (error) {
      console.error("Redis Set Get Error:", error);
      return new Set();
    }
  }
}
