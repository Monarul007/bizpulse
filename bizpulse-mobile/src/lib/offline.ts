import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV({ id: 'bizpulse-cache' });
const CACHE_PREFIX = 'cache:';
const QUEUE_PREFIX = 'queue:';
const TTL_DEFAULT = 5 * 60 * 1000;

export const offlineStorage = {
  get<T>(key: string): T | null {
    const raw = storage.getString(CACHE_PREFIX + key);
    if (!raw) return null;
    try {
      const entry = JSON.parse(raw);
      if (Date.now() - entry.ts > (entry.ttl || TTL_DEFAULT)) {
        storage.remove(CACHE_PREFIX + key);
        return null;
      }
      return entry.data as T;
    } catch { return null }
  },

  set(key: string, data: unknown, ttl?: number) {
    storage.set(CACHE_PREFIX + key, JSON.stringify({ data, ts: Date.now(), ttl }));
  },

  clearCache() {
    const keys = storage.getAllKeys().filter((k: string) => k.startsWith(CACHE_PREFIX));
    keys.forEach((k: string) => storage.remove(k));
  },

  enqueue(action: string, payload: unknown, retries = 0) {
    const id = Date.now().toString();
    storage.set(QUEUE_PREFIX + id, JSON.stringify({ action, payload, id, retries }));
    return id;
  },

  getQueued(id: string): { action: string; payload: unknown; id: string; retries: number } | null {
    const raw = storage.getString(QUEUE_PREFIX + id);
    return raw ? JSON.parse(raw) : null;
  },

  incrementRetries(id: string) {
    const raw = storage.getString(QUEUE_PREFIX + id);
    if (!raw) return;
    const entry = JSON.parse(raw);
    entry.retries += 1;
    storage.set(QUEUE_PREFIX + id, JSON.stringify(entry));
  },

  dequeueAll(): { action: string; payload: unknown; id: string; retries: number }[] {
    const keys = storage.getAllKeys().filter((k: string) => k.startsWith(QUEUE_PREFIX));
    return keys.map((k: string) => {
      const raw = storage.getString(k);
      return raw ? JSON.parse(raw) : null
    }).filter(Boolean);
  },

  dequeue(id: string) {
    storage.remove(QUEUE_PREFIX + id);
  },

  getLastSync(key: string): number | null {
    const raw = storage.getString('last_sync:' + key);
    return raw ? parseInt(raw, 10) : null
  },

  setLastSync(key: string) {
    storage.set('last_sync:' + key, Date.now().toString());
  },
};
