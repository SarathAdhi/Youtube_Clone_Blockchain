import { LoginDetails } from "@utils/recoil";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

export const connectWallet = async () => {
  try {
    const { ethereum } = window as any;

    if (!ethereum) {
      toast.error("Metamask not detected.");
      return;
    }

    const chainId = await ethereum.request({ method: "eth_chainId" });
    const rinkbyChainId = "0x4";

    if (chainId !== rinkbyChainId) {
      toast.error("You are not connected to the Rinkeby Testnet!");
      const details: LoginDetails = {
        isCorrectNetwork: false,
        currentAccount: "",
        error: "Not connected to Rinkeby Testnet",
      };

      return details;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const account = await provider.send("eth_requestAccounts", []);

    if (account.length === 0) {
      toast.error("No account found!");
      return;
    }

    const details: LoginDetails = {
      isCorrectNetwork: true,
      currentAccount: account[0],
      error: "",
    };

    return details;
  } catch ({ message }) {
    const details: LoginDetails = {
      isCorrectNetwork: false,
      currentAccount: "",
      error: message as string,
    };

    toast.error(`${message} If this error persists, Unlock metamask.`);

    return details;
  }
};
