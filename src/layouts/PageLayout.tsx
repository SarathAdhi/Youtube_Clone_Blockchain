import ConnectWallet from "@components/ConnectWallet";
import TopNavbar from "@components/Navbar/TopNavbar";
import SideNavbar from "@components/Navbar/SideNavbar";
import { connectWallet } from "@utils/connect-wallet";
import {
  LoginDetails,
  loginDetails as _loginDetails,
  userDetails as _userDetails,
} from "@utils/recoil";
import { getMyProfile } from "@utils/video";
import clsx from "clsx";
import { ethers } from "ethers";
import Head from "next/head";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

type Props = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

const PageLayout: React.FC<Props> = ({ title, className, children }) => {
  const router = useRouter();

  const [loginDetails, setLoginDetails] = useRecoilState(_loginDetails);
  const [, setUserDetails] = useRecoilState(_userDetails);

  const userProfile = async () => {
    const user = await getMyProfile();
    setUserDetails(user);
  };

  const promptSignInUsingMetamask = async (ethereum: any) => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
    } catch ({ message }) {
      toast.error(`${message}`);
    }
  };

  useEffect(() => {
    const { ethereum } = window as any;

    if (!ethereum) {
      router.replace("/ethereum-not-found");
      toast.error("Please install Metamask");
      return;
    }

    ethereum.on("accountsChanged", async () => {
      const data = await connectWallet();

      if (data) {
        setLoginDetails(data as LoginDetails);
        userProfile();
      }
    });

    return () => {
      if (!loginDetails.currentAccount) {
        promptSignInUsingMetamask(ethereum);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="w-full min-h-screen flex bg-[#181818]">
        <SideNavbar />

        <section className="w-full flex flex-col flex-1">
          <TopNavbar />

          {loginDetails.currentAccount ? (
            <div
              className={clsx(
                "mt-5 px-5 w-full flex flex-col flex-1 text-white rounded-lg",
                className
              )}
            >
              {children}
            </div>
          ) : (
            <ConnectWallet />
          )}
        </section>
      </main>
    </>
  );
};

export default PageLayout;
