import "server-only";

import { cache } from "react";

const getPublicRequestCacheStore = cache(() => new Map<string, Promise<unknown>>());

let scopedStore: Map<string, Promise<unknown>> | null = null;

export async function runWithPublicRequestCache<T>(loader: () => Promise<T>): Promise<T> {
  if (scopedStore) {
    return loader();
  }

  const store = getPublicRequestCacheStore();
  scopedStore = store;

  try {
    return await loader();
  } finally {
    scopedStore = null;
  }
}

export function getOrSetPublicRequestCache<T>(key: string, loader: () => Promise<T>): Promise<T> {
  const store = scopedStore ?? getPublicRequestCacheStore();

  const existing = store.get(key);
  if (existing) {
    return existing as Promise<T>;
  }

  const pending = loader().catch((error) => {
    store.delete(key);
    throw error;
  });
  store.set(key, pending);
  return pending;
}
