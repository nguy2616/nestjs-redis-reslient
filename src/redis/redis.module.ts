import { Module } from '@nestjs/common';

import { CacheService } from './cache.service';
import { redisClientFactory } from './redis.client.factory';
import { RedisRepository } from './repository/redis.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [redisClientFactory, RedisRepository, CacheService],
  exports: [RedisRepository, CacheService],
})
export class RedisModule {}
