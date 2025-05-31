import { FactoryProvider, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

const logger = new Logger('RedisClient');

export const redisClientFactory: FactoryProvider<Redis> = {
  provide: 'RedisClient',
  useFactory: async () => {
    const redis = new Redis({
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      tls:
        process.env.REDIS_TLS == 'true'
          ? { servername: process.env.REDIS_HOST }
          : undefined,
      retryStrategy: (times) => {
        const delay = +process.env.RETRY_DELAY || 60000; // default 60 seconds
        logger.warn(
          `Redis reconnect attempt #${times}, retrying in ${delay}ms`,
        );
        return delay;
      },
      maxRetriesPerRequest: null,
      lazyConnect: true,
    });

    redis.on('connect', () => logger.log('Redis connected'));
    redis.on('ready', () => logger.log('Redis ready'));
    redis.on('error', (e) => {
      logger.error('Redis error:', e);
    });
    redis.on('reconnecting', () => logger.warn('Redis reconnecting...'));
    redis.on('close', () => logger.warn('Redis connection closed'));
    redis.on('end', () => logger.warn('Redis connection ended'));

    await redis.connect().catch((err) => {
      logger.error('Initial Redis connection failed:', err.message);
    });
    return redis;
  },
  inject: [],
};
