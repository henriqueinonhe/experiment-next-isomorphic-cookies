import { AppProps } from "next/app";
import { CookiesProvider, SSGMarker } from "./CookiesProvider";

type App<P extends {}> = (props: AppProps<P>) => JSX.Element;

type WithCookiesProps = {
  cookies: Record<string, unknown>;
};

type AppWithCookies<P extends {}> = (
  props: AppProps<P> & {
    pageProps: WithCookiesProps;
  }
) => JSX.Element;

export const withCookiesAppWrapper =
  <P extends {}>(App: App<P>): AppWithCookies<P> =>
  // eslint-disable-next-line react/display-name
  (props) => {
    return (
      <CookiesProvider cookies={props.pageProps.cookies ?? SSGMarker}>
        <App {...props} />
      </CookiesProvider>
    );
  };
