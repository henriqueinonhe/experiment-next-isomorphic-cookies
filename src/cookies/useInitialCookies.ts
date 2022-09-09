import { useContext } from "react";
import { CookiesContext } from "./CookiesProvider";

export const useInitialCookies = () => {
  const initialCookies = useContext(CookiesContext);

  if (initialCookies === undefined) {
    throw new Error("Provider missing!");
  }

  return initialCookies;
};
