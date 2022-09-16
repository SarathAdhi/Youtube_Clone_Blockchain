import { atom } from "recoil";
import { User } from "types/user";
import { Video } from "types/video";

export type LoginDetails = {
  isCorrectNetwork: boolean;
  currentAccount: string;
  error?: string;
};

export type VideoDetails = Video & User;

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
  default: [] as VideoDetails[],
});
