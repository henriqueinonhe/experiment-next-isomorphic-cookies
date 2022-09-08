import { useState } from "react";
import { useCookie } from "../cookies/useCookie";
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
  const { retrieve, store } = useCookie<string>("SomeCookie");

  const [state, setState] = useState<string>(retrieve() ?? "");

  return (
    <>
      <div>{state}</div>
      <div>
        <input onChange={(event) => setState(event.target.value)} />
      </div>
      <button onClick={() => store(state)}>Persist</button>
    </>
  );
};

export const getServerSideProps =
  withCookiesGetServerSidePropsWrapper<PageProps>(async () => {
    return {
      props: {
        data: "Something",
      },
    };
  });

export default Page;
