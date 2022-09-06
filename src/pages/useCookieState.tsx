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
  const { state, setState } = useCookieState("SomeCookie", "");

  return (
    <>
      <div>{state}</div>
      <div>
        <input onChange={(event) => setState(() => event.target.value)} />
      </div>
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
