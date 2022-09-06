import { createContext, ReactNode } from "react";

type CookiesContextValue = Record<string, string>;

export const CookiesContext = createContext<CookiesContextValue | undefined>(
  undefined
);

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
