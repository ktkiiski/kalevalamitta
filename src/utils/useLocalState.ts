import { useCallback, useEffect, useState } from 'react';

function readValue(key: string): unknown {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
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
  const [cachedValue, setCachedValue] = useState<T>(defaultValue);
  const setValue = useCallback(
    (newValue: T) => {
      setCachedValue(newValue);
      writeValue(key, newValue);
    },
    [key],
  );

  // Because of pre-rendering, load the state from storage on effect
  useEffect(() => {
    const storedValue = readValue(key) as T;
    setCachedValue(storedValue);
  }, [key]);

  return [cachedValue ?? defaultValue, setValue];
}
