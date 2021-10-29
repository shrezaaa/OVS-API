import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheManagerService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async list(exp): Promise<any> {
    return await this.cache.keys(exp);
  }

  async get(key): Promise<any> {
    return await this.cache.get(key);
  }

  async mGet(keys): Promise<any> {
    return await this.cache.mget(keys);
  }

  async set(key, value) {
    await this.cache.set(key, value, 1000);
  }

  async reset() {
    await this.cache.reset();
  }

  async del(key) {
    await this.cache.del(key);
  }
}
