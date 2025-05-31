export interface RedisRepositoryInterface {
  get(key: string);
  del(key: string): Promise<void>;
  set<T>(key: string, value: T, expiry?: number): Promise<void>;
  getKeysByPattern(pattern: string): Promise<string[]>;
}
