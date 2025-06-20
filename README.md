# nestjs-redis-resilient

A robust Redis module for [NestJS](https://nestjs.com/) with built-in **auto-reconnect**, **error logging**, and **safe initialization**. Built on top of [ioredis](https://github.com/luin/ioredis).

---

## ✨ Features

- 🔌 Drop-in Redis client for NestJS
- 🔁 Auto-reconnect on connection loss
- 🧱 Does not crash the app when Redis is down
- 🧪 Includes a reusable `CacheService` and repository pattern
- 🧰 Customizable via environment variables

---

## 📦 Installation

```bash
npm install nestjs-redis-resilient ioredis


🚀 Getting Started
1. Load the module
// app.module.ts
import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis-resilient';

@Module({
  imports: [RedisModule],
})
export class AppModule {}

2. Use the CacheService
import { Injectable } from '@nestjs/common';
import { CacheService } from 'nestjs-redis-resilient';

@Injectable()
export class ExampleService {
  constructor(private readonly cacheService: CacheService) {}

  async run() {
    await this.cacheService.set('my-key', { foo: 'bar' });
    const result = await this.cacheService.get('my-key');
    console.log(result); // { foo: 'bar' }
  }
}

## 🔧 Available Functions

The `CacheService` provides the following methods:

### `get(redisKey: string)`
Retrieves a value from Redis by key.
```typescript
const value = await this.cacheService.get('my-key');
```

### `set<T>(redisKey: string, data: T, expiry?: number)`
Sets a value in Redis with an optional expiry time (in seconds). If no expiry is provided, it uses the `REDIS_TTL` environment variable (default: 300 seconds).
```typescript
await this.cacheService.set('my-key', { foo: 'bar' });
await this.cacheService.set('my-key', { foo: 'bar' }, 600); // 10 minutes
```

### `del(redisKey: string)`
Deletes a key from Redis.
```typescript
await this.cacheService.del('my-key');
```

### `getKeysByPattern(pattern: string)`
Retrieves all keys matching a pattern (supports Redis pattern matching).
```typescript
const keys = await this.cacheService.getKeysByPattern('user:*');
```

⚙️ Environment Variables
| Variable         | Description                    | Default     |
| ---------------- | ------------------------------ | ----------- |
| `REDIS_HOST`     | Redis host                     | `localhost` |
| `REDIS_PORT`     | Redis port                     | `6379`      |
| `REDIS_USERNAME` | (optional) Redis username      | -           |
| `REDIS_PASSWORD` | (optional) Redis password      | -           |
| `REDIS_TLS`      | Enable TLS (`true`/`false`)    | `false`     |
| `REDIS_TTL`      | Default cache TTL (in seconds) | `300`       |
| `RETRY_DELAY`    | Redis retry delay in ms        | `60000`     |
