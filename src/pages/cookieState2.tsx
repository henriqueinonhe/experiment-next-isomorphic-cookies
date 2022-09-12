import { useCookieState } from "next-isomorphic-cookies";
import Link from "next/link";

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
        <button onClick={() => retrieve()}>Retrieve</button>
        <button onClick={() => store()}>Store</button>
      </div>
      <Link href="/cookieState">
        <a>To Page 1</a>
      </Link>
    </>
  );
};

export const getStaticProps = async () => ({
  props: {
    data: "SSG",
  },
});

export default Page;
