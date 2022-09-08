import { createContext, ReactNode } from "react";

export const SSGMarker = Symbol();

type CookiesContextValue = Record<string, string>;

export const CookiesContext = createContext<
  CookiesContextValue | typeof SSGMarker | undefined
>(undefined);

type CookiesProviderProps = {
  children: ReactNode;
  cookies: Record<string, string>;
};

export const CookiesProvider = ({
  children,
  cookies,
}: CookiesProviderProps) => {
  return (
    <CookiesContext.Provider value={cookies}>
      {children}
    </CookiesContext.Provider>
  );
};
