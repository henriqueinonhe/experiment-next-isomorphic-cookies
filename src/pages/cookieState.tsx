import Link from "next/link";
import { useCookieState } from "../cookies/useCookieState";
import { withCookiesGetServerSidePropsWrapper } from "../cookies/withCookiesGetServerSidePropsWrapper";

type PageProps = {
  data: string;
};

const Page = ({ data }: PageProps) => {
  return (
    <>
      {data}
      <Component />
    </>
  );
};

const Component = () => {
  const { value, setValue, store, retrieve } = useCookieState<string>(
    "SomeCookie",
    (storedValue) => storedValue ?? "Duba"
  );

  return (
    <>
      <div>{value}</div>
      <div>
        <input
          value={value}
          onChange={(event) => setValue(() => event.target.value)}
        />
        <button onClick={retrieve}>Retrieve</button>
        <button onClick={store}>Store</button>
      </div>
      <Link href="/cookieState2">
        <a>To Page 2</a>
      </Link>
    </>
  );
};

export const getServerSideProps =
  withCookiesGetServerSidePropsWrapper<PageProps>(async () => {
    return {
      props: {
        data: "SSR",
      },
    };
  });

export default Page;
