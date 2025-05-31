import { Injectable } from '@nestjs/common';
import { RedisRepository } from './repository/redis.repository';

@Injectable()
export class CacheService {
  constructor(private readonly cacheService: RedisRepository) {}

  async get(redisKey: string) {
    return await this.cacheService.get(redisKey);
  }
  async set<T>(redisKey: string, data: T, expiry?: number) {
    return await this.cacheService.set(
      redisKey,
      data,
      expiry ?? (+process.env.REDIS_TTL || 300),
    );
  }
  async del(redisKey: string) {
    return await this.cacheService.del(redisKey);
  }
  async keys(pattern: string) {
    return await this.cacheService.keys(pattern);
  }
}
