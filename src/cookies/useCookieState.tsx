import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useIsomorphicLayoutEffect } from "../hooks/useIsomorphicLayoutEffect";
import { CookiesContext } from "./CookiesProvider";

const useClientSideCookieState = <T,>(
  key: string,
  initialState: T | (() => T)
) => {
  const initialCookies = useContext(CookiesContext);

  if (initialCookies === undefined) {
    throw new Error("Provider missing!");
  }

  // const initialCookies = {};

  const initialCookieState =
    initialCookies[key] !== undefined
      ? JSON.parse(initialCookies[key])
      : undefined;
  const [state, setState] = useState<T>(initialCookieState ?? initialState);

  const retrieve = () => {
    const serializedData = Cookies.get(key);

    if (serializedData === undefined) {
      return undefined;
    }

    return JSON.parse(serializedData);
  };

  const store = (data: unknown) => Cookies.set(key, JSON.stringify(data));

  const clear = () => Cookies.remove(key);

  useIsomorphicLayoutEffect(() => {
    const needsSyncAfterHydration = initialCookieState === undefined;
    if (needsSyncAfterHydration) {
      const storedState = retrieve();
      setState(storedState);
    }
  }, []);

  const decoratedSetState = (
    value: Parameters<ReturnType<typeof useState<T>>[1]>[0]
  ) => {
    setState((state) => {
      const actualValue =
        typeof value === "function" ? (value as Function)(state) : value;
      store(actualValue);

      return actualValue;
    });
  };

  return {
    state,
    setState: decoratedSetState,
    clear,
  };
};

const useServerSideCookieState = <T,>(
  key: string,
  initialState: T | (() => T)
) => {
  const initialCookies = useContext(CookiesContext);

  if (initialCookies === undefined) {
    throw new Error("Provider missing!");
  }

  const initialCookieState =
    initialCookies[key] !== undefined
      ? JSON.parse(initialCookies[key])
      : undefined;
  const [state] = useState<T>(initialCookieState ?? initialState);

  const setState = () => {
    throw new Error("Cannot set cookie state during server side rendering!");
  };

  const clear = () => {
    throw new Error("Cannot clear cookie during server side rendering!");
  };

  return {
    state,
    setState,
    clear,
  };
};

export const useCookieState =
  typeof document !== undefined
    ? useClientSideCookieState
    : useServerSideCookieState;
