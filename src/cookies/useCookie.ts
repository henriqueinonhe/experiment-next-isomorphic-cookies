import Cookies from "js-cookie";
import { useInitialCookies } from "./useInitialCookies";

const useClientSideCookies = <T>(key: string) => {
  const { initialCookies, isHydrating, ssg } = useInitialCookies();

  const store = (data: T) => {
    Cookies.set(key, JSON.stringify(data));
  };

  const retrieve = (): T | undefined => {
    console.log({ ssg, isHydrating });
    // if (ssg && isHydrating) {
    //   console.warn(
    //     "This page uses SSG and you're calling retrieve during hydration, so your data will probably not be initialized correctly.\nTo prevent hydration mismatches, every time retrieve is called during hydration, it returns the cookie value that was sent to the server."
    //   );
    // }

    // In case cookie changes during render
    // const serializedData = isHydrating ? initialCookies[key] : Cookies.get(key);
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
    isHydrating,
  };
};

const useServerSideCookies = <T>(key: string) => {
  const { initialCookies, isHydrating, ssg } = useInitialCookies();

  const store = () => {
    throw new Error("Cannot set cookie during server side rendering!");
  };

  const retrieve = (): T | undefined => JSON.parse(initialCookies[key]);

  const clear = () => {
    throw new Error("Cannot clear cookie during server side rendering!");
  };

  return {
    store,
    retrieve,
    clear,
    ssg,
    isHydrating,
  };
};

export const useCookie =
  typeof document !== "undefined" ? useClientSideCookies : useServerSideCookies;
