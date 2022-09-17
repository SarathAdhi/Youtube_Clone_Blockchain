import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilState } from "recoil";
import { Toaster } from "react-hot-toast";
import { loginDetails } from "@utils/recoil";

type Props = {
  Component: React.FC;
};

const NewComponent: React.FC<Props> = ({ Component, ...pageProps }) => {
  const [{ currentAccount }] = useRecoilState(loginDetails);

  const isAuth = !!currentAccount;

  // @ts-ignore
  return <Component isAuth={isAuth} {...pageProps} />;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <NewComponent Component={Component} {...pageProps} />
      </RecoilRoot>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default MyApp;
