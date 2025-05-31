import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

import { RedisRepositoryInterface } from '../interface/redis.repository.interface';

@Injectable()
export class RedisRepository
  implements OnModuleDestroy, RedisRepositoryInterface
{
  constructor(@Inject('RedisClient') private readonly redisClient: Redis) {
    redisClient.on('connect', () => Logger.log('Redis connected'));
  }

  onModuleDestroy(): void {
    this.redisClient.disconnect();
  }

  async get(redisKey: string) {
    try {
      if (this.redisClient.status !== 'ready') {
        await this.redisClient.connect();
      }
      const value = await this.redisClient.get(redisKey);
      if (value && value.length === 0) return null;
      const result = JSON.parse(value);
      return result;
    } catch (error) {
      Logger.error(error);

      return null;
    }
  }
  async set<T>(redisKey: string, data: T, expiry?: number) {
    try {
      if (this.redisClient.status !== 'ready') {
        await this.redisClient.connect();
      }
      await this.redisClient.set(
        redisKey,
        JSON.stringify(data),
        'EX',
        expiry || process.env.REDIS_TTL,
      );
    } catch (error) {
      Logger.error(error);
    }
  }
  async del(redisKey: string) {
    try {
      if (this.redisClient.status !== 'ready') {
        await this.redisClient.connect();
      }
      await this.redisClient.del(redisKey);
    } catch (error) {
      Logger.error(error);
    }
  }

  async getKeysByPattern(pattern: string) {
    try {
      if (this.redisClient.status !== 'ready') {
        await this.redisClient.connect();
      }
      const matchinggetKeysByPattern: string[] = [];
      let cursor = '0';

      do {
        const [nextCursor, getKeysByPattern] = await this.redisClient.scan(
          cursor,
          'MATCH',
          `*${pattern}*`,
          'COUNT',
          100,
        );
        cursor = nextCursor;
        matchinggetKeysByPattern.push(...getKeysByPattern);
      } while (cursor !== '0');

      return matchinggetKeysByPattern;
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }
}
