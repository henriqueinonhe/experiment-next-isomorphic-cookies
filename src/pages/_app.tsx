import type { AppProps } from "next/app";
import { withCookiesAppWrapper } from "../cookies/withCookiesAppWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withCookiesAppWrapper(MyApp);
