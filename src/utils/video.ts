import { ethers } from "ethers";
import toast from "react-hot-toast";
import ShortUniqueId from "short-unique-id";
import { User } from "types/user";
import { Video } from "types/video";
import videoContract from "../../build/contracts/Youtube.json";

type Error = {
  message: string;
};

const uid = new ShortUniqueId({ length: 10 });

const videoContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

const showErrorToast = (message: string) => {
  if (message.includes("user rejected transaction")) {
    toast.error("Transaction got rejected!!");
    return;
  }

  toast.error(message);

  return message;
};

export const getContractDetails = () => {
  try {
    const { ethereum } = window as any;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const VideoContract = new ethers.Contract(
        videoContractAddress,
        videoContract.abi,
        signer
      );

      return VideoContract;
    } else {
      showErrorToast("Ethereum object doesn't exist");
    }
  } catch (error) {
    console.log(error);
  }
};

export const createOrUpdateUserDetails = async (
  data: User,
  method: "create" | "update"
) => {
  const VideoContract = getContractDetails();

  if (method === "create") {
    return await VideoContract?.createUser(
      data.username,
      data.channelName,
      data.profileImage,
      data.coverImage
    )
      .then((data: User) => data)
      .catch((error: Error) => showErrorToast(error.message));
  }

  return await VideoContract?.updateUser(
    data.username,
    data.channelName,
    data.profileImage,
    data.coverImage,
    data.walletId
  )
    .then((data: User) => data)
    .catch((error: Error) => showErrorToast(error.message));
};

export const getMyProfile = async () => {
  const VideoContract = getContractDetails();

  return await VideoContract?.getMyProfile()
    .then((data: User) => data)
    .catch((error: Error) => showErrorToast(error.message));
};

export const getUserProfile = async (address: string) => {
  const VideoContract = getContractDetails();

  return await VideoContract?.getUserProfile(address)
    .then((data: User) => data)
    .catch((error: Error) => showErrorToast(error.message));
};

export const uploadVideo = async (data: Video) => {
  const VideoContract = getContractDetails();

  return await VideoContract?.uploadVideo(
    uid(),
    data.title,
    data.cids,
    data.description
  )
    .then((data: Video) => data)
    .catch((error: Error) => showErrorToast(error.message));
};

export const updateVideo = async (video: Video) => {
  const VideoContract = getContractDetails();

  return await VideoContract?.updateVideo(
    video.id,
    video.title,
    video.description
  )
    .then((data: Video) => data)
    .catch((error: Error) => showErrorToast(error.message));
};

export const addSubscribe = async (id: User["id"]) => {
  const VideoContract = getContractDetails();

  return await VideoContract?.addSubscribe(id)
    .then((data: any) => data)
    .catch((error: Error) => showErrorToast(error.message));
};

export const deleteVideo = async (uuid: string) => {
  const VideoContract = getContractDetails();

  return await VideoContract?.deleteVideo(uuid)
    .then((data: any) => data)
    .catch((error: Error) => showErrorToast(error.message));
};

export const isChannelNameExist = async (channelName: User["channelName"]) => {
  const VideoContract = getContractDetails();

  return await VideoContract?.isChannelNameExist(channelName)
    .then((data: boolean) => data)
    .catch((error: Error) => showErrorToast(error.message));
};

export const getAllVideos = async () => {
  const VideoContract = getContractDetails();

  return await VideoContract?.getAllVideos()
    .then((data: any) => data)
    .catch((error: Error) => showErrorToast(error.message));
};

export const getVideoByUuid = async (uuid: Video["uuid"]) => {
  const VideoContract = getContractDetails();

  return await VideoContract?.getVideoByUuid(uuid)
    .then((data: any) => data)
    .catch((error: Error) => showErrorToast(error.message));
};

export const addViews = async (id: Video["id"]) => {
  const VideoContract = getContractDetails();

  return await VideoContract?.addViews(id)
    .then((data: any) => data)
    .catch((error: Error) => showErrorToast(error.message));
};

export const addLikes = async (id: Video["id"]) => {
  const VideoContract = getContractDetails();

  return await VideoContract?.addLikes(id)
    .then((data: any) => data)
    .catch((error: Error) => showErrorToast(error.message));
};

export const addDisLikes = async (id: Video["id"]) => {
  const VideoContract = getContractDetails();

  return await VideoContract?.addDisLikes(id)
    .then((data: any) => data)
    .catch((error: Error) => showErrorToast(error.message));
};
