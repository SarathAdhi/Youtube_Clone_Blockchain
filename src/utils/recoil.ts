import { atom } from "recoil";
import { User } from "types/user";
import { VideoProps } from "types/video";

export type LoginDetails = {
  isCorrectNetwork: boolean;
  currentAccount: string;
  error?: string;
};

export const loginDetails = atom({
  key: "loginDetails",
  default: {
    isCorrectNetwork: false,
    currentAccount: "",
    error: "",
  } as LoginDetails,
});

export const userDetails = atom({
  key: "userDetails",
  default: {} as User,
});

export const allVideos = atom({
  key: "allVideos",
  default: [] as VideoProps[],
});
