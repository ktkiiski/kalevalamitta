import { useCallback, useState } from 'react';

function readValue(key: string): unknown {
  try {
    const item = localStorage.getItem(key);
    return item != null ? JSON.parse(item) : item;
  } catch {
    return undefined;
  }
}

function writeValue(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local storage not available
  }
}

export default function useLocalState<T = unknown>(key: string, defaultValue: T): [T, (newValue: T) => void] {
  const [cachedValue, setCachedValue] = useState<T>(() => readValue(key) as T);
  const setValue = useCallback(
    (newValue: T) => {
      setCachedValue(newValue);
      writeValue(key, newValue);
    },
    [key],
  );
  return [cachedValue ?? defaultValue, setValue];
}
