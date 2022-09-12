import type { AppProps } from "next/app";
import { withCookiesAppWrapper } from "next-isomorphic-cookies";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withCookiesAppWrapper(MyApp);
