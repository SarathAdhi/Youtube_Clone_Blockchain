import Button from "@elements/Button";
import { connectWallet } from "@utils/connect-wallet";
import {
  LoginDetails,
  loginDetails as _loginDetails,
  userDetails as _userDetails,
} from "@utils/recoil";
import { getMyProfile } from "@utils/video";
import React from "react";
import { useRecoilState } from "recoil";

const ConnectWallet = () => {
  const [, setLoginDetails] = useRecoilState(_loginDetails);
  const [, setUserDetails] = useRecoilState(_userDetails);

  const userProfile = async () => {
    const user = await getMyProfile();
    setUserDetails(user);
  };

  const handleSubmit = async () => {
    const loginDetails = await connectWallet();

    if (!loginDetails?.error) {
      setLoginDetails(loginDetails as LoginDetails);
      userProfile();
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <Button
        onClick={handleSubmit}
        className="px-2 py-1 text-xl font-medium text-white bg-orange-500 rounded-md"
      >
        Connect Wallet
      </Button>
    </div>
  );
};

export default ConnectWallet;
