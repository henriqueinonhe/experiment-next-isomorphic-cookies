import { useState } from "react";
import { useIsomorphicLayoutEffect } from "../hooks/useIsomorphicLayoutEffect";
import { useCookie } from "./useCookie";

const useClientSideCookieState = <T>(
  key: string,
  initializer: (storedValue: T | undefined) => T
) => {
  const { retrieve, store, clear, ssg, isHydrating } = useCookie<T>(key);

  const needsSyncAfterHydration = ssg && isHydrating;

  console.log({ ssg, isHydrating });

  const [value, setValue] = useState<T>(() =>
    initializer(needsSyncAfterHydration ? undefined : retrieve())
  );

  useIsomorphicLayoutEffect(() => {
    if (needsSyncAfterHydration) {
      boundRetrieve();
    }
  }, []);

  const boundRetrieve = () => {
    const storedValue = retrieve();
    setValue(storedValue ?? initializer(storedValue));
  };

  const boundStore = () => {
    store(value);
  };

  const boundClear = clear;

  return {
    value,
    setValue,
    retrieve: boundRetrieve,
    store: boundStore,
    clear: boundClear,
  };
};

const useServerSideCookieState = <T>(
  key: string,
  initializer: (storedValue: T | undefined) => T
) => {
  const { retrieve } = useCookie<T>(key);

  const [value, setValue] = useState<T>(() => initializer(retrieve()));

  const boundRetrieve = () => undefined;

  const boundStore = () => {
    throw new Error("Cannot set cookie during server side rendering!");
  };

  const boundClear = () => {
    throw new Error("Cannot clear cookie during server side rendering!");
  };

  return {
    value,
    setValue,
    retrieve: boundRetrieve,
    store: boundStore,
    clear: boundClear,
  };
};

export const useCookieState =
  typeof document !== undefined
    ? useClientSideCookieState
    : useServerSideCookieState;
