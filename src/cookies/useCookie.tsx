import { useContext } from "react";
import Cookies from "js-cookie";
import { CookiesContext } from "./CookiesProvider";


const useClientSideCookies = (key: string) => {
  const store = (data: unknown) => Cookies.set(key, JSON.stringify(data));

  const retrieve = () => {
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
  };
};

const useServerSideCookies = (key: string) => {
  const cookies = useContext(CookiesContext);
  
  if (cookies === undefined) {
    throw new Error("Provider missing!");
  }

  const store = () => {
    throw new Error("Cannot set cookie during server side rendering!");
  };

  const retrieve = () => JSON.parse(cookies[key]);

  const clear = () => {
    throw new Error("Cannot clear cookie during server side rendering!");
  };

  return {
    store,
    retrieve,
    clear,
  };
};

export const useCookie =
  typeof document !== "undefined" ? useClientSideCookies : useServerSideCookies;
