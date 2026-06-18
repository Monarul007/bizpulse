import api from './api';
import { offlineStorage } from './offline';

interface CacheConfig {
  ttl?: number;
  key?: string;
}

export async function cachedGet<T>(url: string, config?: CacheConfig): Promise<T> {
  const cacheKey = config?.key || url;
  const cached = offlineStorage.get<T>(cacheKey);
  if (cached) return cached;

  try {
    const res = await api.get(url);
    const data = res.data.data as T;
    offlineStorage.set(cacheKey, data, config?.ttl);
    offlineStorage.setLastSync(cacheKey);
    return data;
  } catch (err) {
    if (cached) return cached;
    throw err;
  }
}

export async function safeMutation<T>(
  action: string,
  apiCall: () => Promise<T>,
  offlinePayload?: unknown,
): Promise<T> {
  try {
    const result = await apiCall();
    return result;
  } catch {
    if (offlinePayload !== undefined) {
      offlineStorage.enqueue(action, offlinePayload);
    }
    throw new Error('Offline: request queued');
  }
}

const MAX_RETRIES = 5;
const BASE_DELAY = 2000;

export async function flushQueue() {
  const items = offlineStorage.dequeueAll();
  if (!items.length) return;

  for (const item of items) {
    if (item.retries >= MAX_RETRIES) {
      offlineStorage.dequeue(item.id);
      continue;
    }

    try {
      const parts = item.action.split(':');
      const method = parts[0] as 'post' | 'put' | 'delete';
      const url = parts.slice(1).join(':');
      await api[method](url, item.payload as any);
      offlineStorage.dequeue(item.id);
    } catch {
      offlineStorage.incrementRetries(item.id);
      const updated = offlineStorage.getQueued(item.id);
      if (updated && updated.retries < MAX_RETRIES) {
        const delay = BASE_DELAY * Math.pow(2, updated.retries - 1);
        setTimeout(() => flushQueue(), delay);
      } else if (updated) {
        offlineStorage.dequeue(item.id);
      }
    }
  }
}
