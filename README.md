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
