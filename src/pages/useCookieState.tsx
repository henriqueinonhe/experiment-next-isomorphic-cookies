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
    </>
  );
};

// export const getServerSideProps =
//   withCookiesGetServerSidePropsWrapper<PageProps>(async () => {
//     return {
//       props: {
//         data: "Something",
//       },
//     };
//   });

export default Page;
