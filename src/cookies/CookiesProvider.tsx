import { createContext, ReactNode, useMemo, useRef } from "react";

export const SSGMarker = Symbol();

type CookiesContextValue = {
  initialCookies: Record<string, string>;
  isHydrating: boolean;
  ssg: boolean;
};

export const CookiesContext = createContext<CookiesContextValue | undefined>(
  undefined
);

type CookiesProviderProps = {
  children: ReactNode;
  cookies: Record<string, string> | typeof SSGMarker;
};

export const CookiesProvider = ({
  children,
  cookies,
}: CookiesProviderProps) => {
  const ssg = cookies === SSGMarker;
  const isHydratingRef = useRef(true);
  const isHydrating = isHydratingRef.current;

  isHydratingRef.current = false;

  const value = useMemo(
    () => ({
      isHydrating,
      initialCookies: ssg ? {} : cookies,
      ssg,
    }),
    [cookies, isHydrating, ssg]
  );

  return (
    <CookiesContext.Provider value={value}>{children}</CookiesContext.Provider>
  );
};
