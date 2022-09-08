import { useRef } from "react";
import Cookies from "js-cookie";
import { SSGMarker } from "./CookiesProvider";
import { useInitialCookies } from "./useInitialCookies";

const useClientSideCookies = <T>(key: string) => {
  const initialCookies = useInitialCookies();

  const ssg = initialCookies === SSGMarker;

  const isFirstRenderRef = useRef(true);

  if (isFirstRenderRef.current) {
    isFirstRenderRef.current = false;
  }

  const store = (data: T) => {
    Cookies.set(key, JSON.stringify(data));
  };

  const retrieve = (): T | undefined => {
    if (isFirstRenderRef.current && ssg) {
      console.warn(
        "This page uses SSG and you're trying to retrieve cookies during the first render, which will most likely cause a hydration mismatch!"
      );
    }

    const serializedData = Cookies.get(key);

    if (serializedData === undefined) {
      return undefined;
    }

    return JSON.parse(serializedData);
  };

  const clear = () => Cookies.remove(key);

  return {
    store,
    retrieve,
    clear,
    ssg,
  };
};

const useServerSideCookies = <T>(key: string) => {
  const initialCookies = useInitialCookies();

  const ssg = initialCookies === SSGMarker;

  const store = () => {
    throw new Error("Cannot set cookie during server side rendering!");
  };

  const retrieve = (): T | undefined =>
    ssg ? undefined : JSON.parse(initialCookies[key]);

  const clear = () => {
    throw new Error("Cannot clear cookie during server side rendering!");
  };

  return {
    store,
    retrieve,
    clear,
    ssg,
  };
};

export const useCookie =
  typeof document !== "undefined" ? useClientSideCookies : useServerSideCookies;
